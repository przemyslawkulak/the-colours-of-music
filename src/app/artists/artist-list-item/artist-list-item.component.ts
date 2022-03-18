import { Country } from '@angular-material-extensions/select-country';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ArtistTable } from '@shared/models/article';
import { debounceTime, Subject } from 'rxjs';
import { ArtistEditModalComponent } from '../artist-edit-modal/artist-edit-modal.component';

@Component({
  selector: 'app-artist-list-item',
  templateUrl: './artist-list-item.component.html',
  styleUrls: ['./artist-list-item.component.scss'],
})
export class ArtistListItemComponent {
  @Input() artist!: ArtistTable;

  @Input() countryList: Country[] | null = [];

  // @Output() changedCountry: EventEmitter<ArtistTable> = new EventEmitter();
  @Output() changedPosition: EventEmitter<number> = new EventEmitter();
  @Output() changedCheckbox: EventEmitter<null> = new EventEmitter();

  @Output()
  artistChanged = new EventEmitter();
  private debouncer: Subject<number> = new Subject<number>();

  rankNumberList = Array.from({ length: 200 }, (_, i) => i + 1);

  EMPTYCOUNTRY = {
    name: '',
    alpha2Code: '',
    alpha3Code: '',
    numericCode: '',
    callingCode: '',
  };

  constructor(private dialog: MatDialog) {
    this.debouncer.pipe(debounceTime(1000)).subscribe((value) => {
      this.changedPosition.emit(value);
    });
  }

  changeCountry(event: Country) {
    this.artist.countries = [event];
  }

  autoChangePosition(currentIndex: number) {
    this.debouncer.next(currentIndex);
  }

  updateCheckbox() {
    this.changedCheckbox.emit();
  }

  saveItemChanges(artist: ArtistTable) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';

    dialogConfig.data = {
      dialogTitle: 'Edit Artist',
      artist,
      mode: 'update',
    };

    this.dialog
      .open(ArtistEditModalComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.artistChanged.emit());
  }
}
