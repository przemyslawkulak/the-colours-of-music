import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Article } from '@shared/models/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private _apiService: ApiService) {}

  getArticles(
    start = 0,
    limit = 999,
    query?: string,
    sortBy?: string,
    filter?: string
  ): Observable<Article[]> {
    const path = `articles?_start=${start}&_limit=${limit}${
      sortBy ? '&_sort=' + sortBy : ''
    }${filter ? '&' + filter : ''}${query ? '&_q=' + query : ''}`;
    return this._apiService.get(path);
  }

  getArticle(id: number): Observable<Article> {
    return this._apiService.get(`articles/${id}`);
  }
}
