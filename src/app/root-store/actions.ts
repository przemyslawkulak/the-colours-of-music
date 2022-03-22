import { Country } from '@angular-material-extensions/select-country';
import { createAction, props } from '@ngrx/store';


export const loadCountries = createAction(
  '[Root Component] Load Countries'
);

export const loadCountriesSuccess = createAction(
  '[Country API] Get All Countries',
  props<{ countries: Country[] }>()
);
