import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { countryReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('countries', countryReducer),
    EffectsModule.forFeature([CountryEffects]),
  ],
})
export class RootStoreModule {}
