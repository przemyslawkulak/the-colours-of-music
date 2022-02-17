// TODO - check if needed EscapeHtmlService, NotificationService, LoaderService

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseApiUrl: string = '/api/v1/';
  private readonly defaultOptions: any = {
    withCredentials: true,
  };

  constructor(
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  get(
    url: string,
    params?: HttpParams | { [param: string]: any }
  ): Observable<any> {
    const options = Object.assign({}, this.defaultOptions);

    if (params) {
      options.params = params;
    }

    return this._httpClient.get(this.baseApiUrl + url, options).pipe(
      catchError((error) => {
        this.notifyUser(error);
        return throwError(() => error);
      })
    );
  }

  post(url: string, data: any, options?: any): Observable<any> {
    options = options
      ? Object.assign({}, this.defaultOptions, options)
      : this.defaultOptions;

    return this._httpClient.post(this.baseApiUrl + url, data, options).pipe(
      catchError((error) => {
        this.notifyUser(error);
        return throwError(() => error);
      })
    );
  }

  patch(url: string, data: any, options?: any): Observable<any> {
    options = options
      ? Object.assign({}, this.defaultOptions, options)
      : this.defaultOptions;

    return this._httpClient.patch(this.baseApiUrl + url, data, options).pipe(
      catchError((error) => {
        this.notifyUser(error);
        return throwError(() => error);
      })
    );
  }

  put(url: string, data: any): Observable<any> {
    return this._httpClient
      .put(this.baseApiUrl + url, data, this.defaultOptions)
      .pipe(
        catchError((error) => {
          this.notifyUser(error);
          return throwError(() => error);
        })
      );
  }

  delete(url: string): Observable<any> {
    return this._httpClient
      .delete(this.baseApiUrl + url, this.defaultOptions)
      .pipe(
        catchError((error) => {
          this.notifyUser(error);
          return throwError(() => error);
        })
      );
  }

  private notifyUser(response: HttpErrorResponse) {
    console.log(response);
    this._snackBar.open(response.message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      announcementMessage: `We're having trouble accessing services. Please check your network connectivity. If this doesn't help, please follow up with our support team.`,
      panelClass: ['error-notification'],
    });
  }
}
