import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Artist, ArtistTable } from '@shared/models/article';
import { ArtistsService } from '@shared/services/artists/artists.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Country } from '@angular-material-extensions/select-country';
import {
  combineLatest,
  debounceTime,
  forkJoin,
  Observable,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllCountries } from 'src/app/root-store/selectors';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
})
export class ArtistListComponent implements OnInit {
  public artistsList!: MatTableDataSource<Artist>;
  isLoading = false;
  checked = false;

  initPageSettings: PageEvent = {
    previousPageIndex: undefined,
    pageIndex: 0,
    pageSize: 200,
    length: 100,
  };

  rankNumberList = Array.from({ length: 101 }, (_, i) => i + 1);

  allComplete = false;

  countryList: Observable<Country[]> = of([]);

  public ddartists: ArtistTable[] = [];
  pageEvent: PageEvent = this.initPageSettings;
  countries$: Observable<Country[]> = of([]);

  pageControl = new FormControl(this.initPageSettings);

  topFilterControl = new FormControl('Ranked');
  searchTextControl = new FormControl('');

  topFilterOptions: string[] = ['Not Ranked', 'Ranked', 'All'];

  artistListOption: 'table' | 'dnd' = 'dnd';

  constructor(private _artistsService: ArtistsService, private store: Store) {}

  ngOnInit(): void {
    this.countryList = this.store.select(selectAllCountries);
    combineLatest([
      this.topFilterControl.valueChanges.pipe(startWith('Ranked')),
      this.searchTextControl.valueChanges
        .pipe(startWith(''))
        .pipe(debounceTime(500)),

      this.pageControl.valueChanges.pipe(startWith(this.initPageSettings)),
    ])
      .pipe(
        switchMap(([filter, query, pageEvent]) => {
          this.pageEvent = pageEvent;
          return this.getArtists(filter, query);
        })
      )
      .subscribe(([artistList, artistCount]) => {
        const artistTableList: ArtistTable[] = artistList.map(
          (artist: ArtistTable) => {
            // const indexNumber =
            //   i + 1 + this.pageEvent.pageIndex * this.pageEvent.pageSize;
            // artist.Top = indexNumber <= 101 ? indexNumber : undefined;

            return artist;
          }
        );
        this.ddartists = artistTableList;
        this.pageEvent.length = artistCount;
        this.isLoading = false;
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ddartists, event.previousIndex, event.currentIndex);
    this.ddartists =
      this.topFilterControl.value === 'Ranked'
        ? this.updateArtistTopList(this.ddartists)
        : this.ddartists;
  }

  autoChangePosition(previousIndex: number, currentIndex: number) {
    this.topFilterControl.value === 'Ranked' &&
      moveItemInArray(this.ddartists, previousIndex, currentIndex);
    this.ddartists =
      this.topFilterControl.value === 'Ranked'
        ? this.updateArtistTopList(this.ddartists)
        : this.ddartists;
  }

  getArtists(filter: string, query: string) {
    this.isLoading = true;
    return forkJoin([
      this._artistsService.getArtists(
        this.pageEvent.pageSize * this.pageEvent.pageIndex,
        this.pageEvent.pageSize,
        query,
        filter === 'All'
          ? 'displayName:ASC'
          : filter === 'Ranked'
          ? 'Top:ASC'
          : '',
        filter === 'All'
          ? undefined
          : filter === 'Ranked'
          ? 'Top_gte=1'
          : 'Top_null=true'
      ),
      this._artistsService.getArtistCount(),
    ]);
  }

  saveChanges() {
    this.ddartists
      .filter(
        (artist) =>
          artist?.countries?.length &&
          !!artist.countries.filter((country) => country.name).length
      )
      .forEach((item) =>
        item.to_save
          ? this._artistsService.updateArtist(item).subscribe()
          : null
      );
  }

  changeCountry(event: Country, index: number) {
    this.ddartists[index].countries = [event];
  }

  pageChange(event: PageEvent) {
    this.pageControl.setValue(event);
  }

  updateArtistTopList(artistTableList: ArtistTable[]) {
    return artistTableList.map(({ ...artist }: ArtistTable, i: number) => {
      const indexNumber =
        i + 1 + this.pageEvent.pageIndex * this.pageEvent.pageSize;
      artist.Top = indexNumber <= 200 ? indexNumber : undefined;
      return artist;
    });
  }

  setAll(completed: boolean) {
    this.allComplete = true;
    this.ddartists = this.ddartists.map(({ ...artist }) => {
      artist.to_save = completed;
      return artist;
    });
  }

  someComplete(): boolean {
    return (
      this.ddartists.filter((t) => t.to_save).length > 0 && !this.allComplete
    );
  }

  updateAllComplete() {
    this.allComplete = this.ddartists.every((t) => t.to_save);
  }

  identify(index: number, item: Artist) {
    return item.displayName;
  }
}
