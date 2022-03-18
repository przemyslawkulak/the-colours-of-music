import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Album } from '@shared/models/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor(private _apiService: ApiService) {}

  getAlbums(
    start = 0,
    limit = 999,
    query?: string,
    sortBy?: string,
    filter?: string
  ): Observable<Album[]> {
    const path = `albums?_start=${start}&_limit=${limit}${
      sortBy ? '&_sort=' + sortBy : ''
    }${filter ? '&' + filter : ''}${query ? '&_q=' + query : ''}`;
    return this._apiService.get(path);
  }

  getAlbumCount() {
    return this._apiService.get('albums/count');
  }

  updateAlbum(body: Album) {
    return this._apiService.put(`albums/${body.id}`, body);
  }
}
