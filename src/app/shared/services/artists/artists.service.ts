import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Artist } from '@shared/models/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  constructor(private _apiService: ApiService) {}
  getArtists(
    start = 0,
    limit = 999,
    query?: string,
    sortBy?: string,
    filter?: string
  ): Observable<Artist[]> {
    const path = `artists?_start=${start}&_limit=${limit}${
      sortBy ? '&_sort=' + sortBy : ''
    }${filter ? '&' + filter : ''}${query ? '&_q=' + query : ''}`;
    return this._apiService.get(path);
  }

  getArtistCount() {
    return this._apiService.get('artists/count');
  }

  updateArtist(body: Artist) {
    return this._apiService.put(`artists/${body.id}`, body);
  }
}
