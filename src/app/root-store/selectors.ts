import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, countryAdapter } from './state';

export const selectCountriesState =
  createFeatureSelector<AppState>('countries');

export const selectAllCountries = createSelector(
  selectCountriesState,
  countryAdapter.getSelectors().selectAll
);
