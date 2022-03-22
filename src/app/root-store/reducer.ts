import { createReducer, on } from '@ngrx/store';
import { CountryActions } from './action-types';
import { AppState, initialCountryState, countryAdapter } from './state';

export const countryReducer = createReducer<AppState>(
  initialCountryState,
  on(CountryActions.loadCountriesSuccess, (state, { countries }): AppState => {
    return countryAdapter.addMany(countries, state);
  })
);
