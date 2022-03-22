import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountriesService } from '@shared/services/countries/countries.service';
import { mergeMap, map, catchError, of } from 'rxjs';
import { CountryActions } from './action-types';

@Injectable()
export class CountryEffects {
  constructor(
    private actions$: Actions,
    private countriesService: CountriesService
  ) {}
  loadCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.countriesService.getCountries().pipe(
          map((countries) => CountryActions.loadCountriesSuccess({ countries }))
          // catchError(error => of(CountryActions.loadProductsFailure({ error })))
        )
      )
    );
  });
}
