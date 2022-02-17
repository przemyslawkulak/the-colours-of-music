import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Artist } from '@shared/models/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  constructor(private _apiService: ApiService) {}
  getArtists(start: number, limit: number): Observable<Artist[]> {
    return this._apiService.get(`artists?_start=${start}&_limit=${limit}`);
  }
}
