import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingPageModule } from './landing-page/landing-page.module';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { RootStoreModule } from './root-store/root-store.module';
import { EffectsModule } from '@ngrx/effects';
import { UserGuard } from './user/user.guard';
import { UserModule } from './user/user.module';
import { JwtInterceptor } from './user/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './user/interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectCountryModule.forRoot('en'),
    UserModule.forRoot(),
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),

    RootStoreModule,
  ],
  providers: [
    UserGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
