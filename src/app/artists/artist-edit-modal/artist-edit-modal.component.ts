import { Country } from '@angular-material-extensions/select-country';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artist } from '@shared/models/article';
import { CountriesService } from '@shared/services/countries/countries.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-artist-edit-modal',
  templateUrl: './artist-edit-modal.component.html',
  styleUrls: ['./artist-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ArtistEditModalComponent implements OnInit {
  formArtist: FormGroup;

  artist: Artist;

  mode: 'create' | 'update';

  separatorKeysCodes: number[] = [ENTER, COMMA];

  dialogTitle: string;
  countryList$: Observable<Country[]> = of([]);

  loading$: Observable<boolean> = of(false);

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private _countriesService: CountriesService,
    private dialogRef: MatDialogRef<ArtistEditModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { artist: Artist; mode: 'create' | 'update'; dialogTitle: string }
  ) {
    this.countryList$ = this._countriesService.getCountries();

    this.artist = data.artist;
    this.mode = data.mode;
    this.dialogTitle = data.dialogTitle;

    const formControls = {
      displayName: ['', Validators.required],
      Top: [undefined],
      Described: [false, Validators.required],
      countries: [new FormControl([])],
      albums: [new FormControl([])],
      articles: [new FormControl([])],
      spotifyUrl: [''],
      tracks: [new FormControl([])],
      tags: [new FormControl([])],
    };

    if (this.mode == 'update') {
      this.formArtist = this.fb.group(formControls);
      this.formArtist.patchValue({ ...data.artist });
    } else {
      this.formArtist = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required],
      });
    }
  }

  ngOnInit() {}

  step = -1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  countrySelection(event: Country) {
    this.formArtist.get('countries')?.patchValue([event]);
  }

  get albumItems() {
    return this.formArtist.get('albums')?.value;
  }

  get trackItems() {
    return this.formArtist.get('tracks')?.value;
  }

  get tagItems() {
    return this.formArtist.get('tags')?.value;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    console.log(this.formArtist.value);
  }
}
