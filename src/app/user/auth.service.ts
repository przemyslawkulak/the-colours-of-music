import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserResponse } from './user.model';
import { UserService } from './user.service';

export interface AccessData {
  token_type: 'Bearer';
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject$: BehaviorSubject<UserResponse | null>;
  public currentUser$: Observable<UserResponse | null>;

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private _userService: UserService) {
    const userFromLocalStorage = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') || '')
      : {};

    this.currentUserSubject$ = new BehaviorSubject<UserResponse | null>(
      userFromLocalStorage
    );
    this.currentUser$ = this.currentUserSubject$.asObservable();

    this.isLoggedIn$ = this.currentUser$.pipe(
      map((response) => !!response?.user?.id)
    );

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((isLoggedIn) => !isLoggedIn));
  }

  public get currentUserValue(): UserResponse | null {
    return this.currentUserSubject$.value;
  }

  login(body: Partial<User>) {
    return this._userService.login(body).pipe(
      map((user) => {
        return this.storeUserInLocal(user);
      })
    );
  }

  signIn(body: Partial<User>) {
    return this._userService.signIn(body).pipe(
      map((user) => {
        return this.storeUserInLocal(user);
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject$.next(null);
    this.router.navigate(['/login']);
  }

  storeUserInLocal(user: UserResponse) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject$.next(user);
    return user;
  }
}
