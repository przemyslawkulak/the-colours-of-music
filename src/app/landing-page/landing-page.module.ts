import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

@NgModule({
  imports: [CommonModule, SharedModule, MatSelectCountryModule],
  exports: [],
  declarations: [LandingPageComponent],
})
export class LandingPageModule {}
