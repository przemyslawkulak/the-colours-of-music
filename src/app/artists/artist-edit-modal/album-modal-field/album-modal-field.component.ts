import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Album } from '@shared/models/article';
import { AlbumsService } from '@shared/services/albums/albums.service';
import { Observable, of, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-album-modal-field',
  templateUrl: './album-modal-field.component.html',
  styleUrls: ['./album-modal-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumModalFieldComponent implements OnInit {
  _albumForm: FormControl = new FormControl([]);

  @Input() set albumForm(value: Album[]) {
    this._albumForm.patchValue(value);
  }

  @Output() changedalbumForm: EventEmitter<Album[]> = new EventEmitter();

  albumCtrl = new FormControl();
  albumsList$: Observable<Album[]> = of([]);

  @ViewChild('albumInput') albumInput!: ElementRef<HTMLInputElement>;

  constructor(private _albumsService: AlbumsService) {}

  ngOnInit(): void {
    this.albumsList$ = this.albumCtrl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query) => {
        if (query.length < 3) {
          return of([]);
        }
        return this._albumsService.getAlbums(0, 10, `${query}`);
      })
    );
  }

  removeAlbum(album: Album): void {
    const index = this.albumItems.indexOf(album);

    if (index >= 0) {
      this.albumItems.splice(index, 1);
    }
  }

  addAlbum(event: MatChipInputEvent) {
    if (event) {
      this.albumItems.push(event);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  selectedAlbum(event: MatAutocompleteSelectedEvent): void {
    this.albumInput.nativeElement.value = '';
    this.albumItems.push(event.option.value);
    this.albumInput.nativeElement.focus();
  }

  get albumItems() {
    return this._albumForm.value;
  }
}
