import { Country } from '@angular-material-extensions/select-country';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

export const countryAdapter: EntityAdapter<Country> =
  createEntityAdapter<Country>();

export interface AppState extends EntityState<Country> {}

export const initialCountryState: AppState = countryAdapter.getInitialState({});
