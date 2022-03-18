import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Tag } from '@shared/models/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private _apiService: ApiService) {}

  getTags(
    start = 0,
    limit = 999,
    query?: string,
    sortBy?: string,
    filter?: string
  ): Observable<Tag[]> {
    const path = `tags?_start=${start}&_limit=${limit}${
      sortBy ? '&_sort=' + sortBy : ''
    }${filter ? '&' + filter : ''}${query ? '&_q=' + query : ''}`;
    return this._apiService.get(path);
  }

  getTag(id: number) {
    return this._apiService.get(`tags/${id}`);
  }
}
