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
import { Track } from '@shared/models/article';
import { TracksService } from '@shared/services/tracks/tracks.service';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-track-modal-field',
  templateUrl: './track-modal-field.component.html',
  styleUrls: ['./track-modal-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackModalFieldComponent implements OnInit {
  _trackForm: FormControl = new FormControl([]);

  @Input() set trackForm(value: Track[]) {
    this._trackForm.patchValue(value);
  }

  @Output() changedtrackForm: EventEmitter<Track[]> = new EventEmitter();

  trackCtrl = new FormControl();
  tracksList$: Observable<Track[]> = of([]);

  @ViewChild('trackInput') trackInput!: ElementRef<HTMLInputElement>;

  constructor(private _tracksService: TracksService) {}

  ngOnInit(): void {
    this.tracksList$ = this.trackCtrl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query) => {
        if (query.length < 3) {
          return of([]);
        }
        return this._tracksService.getTracks(0, 10, `${query}`);
      })
    );
  }

  removeTrack(track: Track): void {
    const index = this.trackItems.indexOf(track);

    if (index >= 0) {
      this.trackItems.splice(index, 1);
    }
  }

  addTrack(event: MatChipInputEvent) {
    if (event) {
      this.trackItems.push(event);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  selectedTrack(event: MatAutocompleteSelectedEvent): void {
    this.trackInput.nativeElement.value = '';
    this.trackItems.push(event.option.value);
    this.trackInput.nativeElement.focus();
  }

  get trackItems() {
    return this._trackForm.value;
  }
}
