import { Country } from '@angular-material-extensions/select-country';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ArtistTable } from '@shared/models/article';

@Component({
  selector: 'app-dragable-artist-card',
  templateUrl: './dragable-artist-card.component.html',
  styleUrls: ['./dragable-artist-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragableArtistCardComponent {
  @Input() artist!: ArtistTable;

  @Input() countryList: Country[] = [];

  // @Output() changedCountry: EventEmitter<ArtistTable> = new EventEmitter();
  @Output() changedPosition: EventEmitter<number> = new EventEmitter();
  @Output() changedCheckbox: EventEmitter<null> = new EventEmitter();

  rankNumberList = Array.from({ length: 200 }, (_, i) => i + 1);

  EMPTYCOUNTRY = {
    name: '',
    alpha2Code: '',
    alpha3Code: '',
    numericCode: '',
    callingCode: '',
  };

  changeCountry(event: Country) {
    this.artist.countries = [event];
  }

  autoChangePosition(currentIndex: number) {
    this.changedPosition.emit(currentIndex);
  }

  updateCheckbox() {
    this.changedCheckbox.emit();
  }
}
