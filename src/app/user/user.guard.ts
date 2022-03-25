import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserResponse } from './user.model';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private router: Router, private _authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this._authService.currentUser$.pipe(
      map((currentUser: UserResponse | null) => {
        return !!currentUser?.jwt;
      }),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
