import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Track } from '@shared/models/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  constructor(private _apiService: ApiService) {}

  getTracks(
    start = 0,
    limit = 999,
    query?: string,
    sortBy?: string,
    filter?: string
  ): Observable<Track[]> {
    const path = `tracks?_start=${start}&_limit=${limit}${
      sortBy ? '&_sort=' + sortBy : ''
    }${filter ? '&' + filter : ''}${query ? '&_q=' + query : ''}`;
    return this._apiService.get(path);
  }

  getTrack(id: number) {
    return this._apiService.get(`tracks/${id}`);
  }
}
