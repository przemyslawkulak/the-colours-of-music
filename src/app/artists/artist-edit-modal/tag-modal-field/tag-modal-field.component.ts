import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Article, Artist, Tag } from '@shared/models/article';
import { ArticlesService } from '@shared/services/articles/articles.service';
import { TagsService } from '@shared/services/tags/tags.service';
import {
  Observable,
  of,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  forkJoin,
  map,
  merge,
  BehaviorSubject,
} from 'rxjs';

@Component({
  selector: 'app-tag-modal-field',
  templateUrl: './tag-modal-field.component.html',
  styleUrls: ['./tag-modal-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagModalFieldComponent implements OnInit {
  _tagForm: FormControl = new FormControl([]);

  @Input() set tagForm(value: Tag[]) {
    this._tagForm.patchValue(value);
  }
  @Input() artist!: Artist;

  @Output() changedtagForm: EventEmitter<Tag[]> = new EventEmitter();

  tagCtrl = new FormControl();
  tagsList$: Observable<Tag[]> = of([]);

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  private articleListSubject: BehaviorSubject<Article[]> = new BehaviorSubject<
    Article[]
  >([]);
  public readonly articleList$: Observable<Article[]> =
    this.articleListSubject.asObservable();

  tagsFromArticle$: Observable<unknown> = this.articleList$.pipe(
    map((articles) => {
      articles.map((article) => {
        this._articlesService.getArticle(article.id);
      });
    })
  );

  constructor(
    private _tagsService: TagsService,
    private _articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.tagsList$ = merge(
      this.articleList$,
      this.tagCtrl.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
    ).pipe(
      switchMap((result) => {
        if (typeof result === 'string' && result?.length > 2) {
          return this._tagsService.getTags(0, 10, `${result}`);
        } else if (result instanceof Array && result.length > 0) {
          const articleList$: Observable<Article>[] = result.map((article) => {
            return this._articlesService.getArticle(article.id);
          });
          return forkJoin(articleList$).pipe(
            map((response: Article[]) => {
              return this.extractUniqueTags(response);
            })
          );
        }
        return of([]);
      })
    );
  }

  private extractUniqueTags(articles: Article[]): Tag[] {
    const tagList = articles.map((article: Article) => article.tags).flat();
    const uniqueTags: Tag[] = this.removeDuplication(tagList);
    this.tagItems.push(...uniqueTags);
    return uniqueTags;
  }

  private removeDuplication(values: Tag[]): Tag[] {
    return [...new Map(values.map((v: Tag) => [v.id, v])).values()];
  }

  removeTag(tag: Tag): void {
    const index = this.tagItems.indexOf(tag);

    if (index >= 0) {
      this.tagItems.splice(index, 1);
    }
  }

  addTag(event: MatChipInputEvent): void {
    if (event) {
      this.tagItems.push(event);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.tagInput.nativeElement.value = '';
    this.tagItems.push(event.option.value);
    this.tagInput.nativeElement.focus();
  }

  get tagItems() {
    return this._tagForm.value;
  }

  getTagsFromArticle(): void {
    const articles = this.artist.articles;
    if (articles.length) {
      this.articleListSubject.next(articles);
    }
  }
}
