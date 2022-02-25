import { Country } from '@angular-material-extensions/select-country';
import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private _apiService: ApiService) {}

  getCountries(): Observable<Country[]> {
    return this._apiService.get('countries?_limit=999').pipe(shareReplay());
  }

  addCountry(body: Country) {
    return this._apiService.post(`countries/`, body);
  }
}
