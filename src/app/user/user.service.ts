import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserResponse } from './user.model';
import { ApiService } from '@core/services/api.service';

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {}

  login(body: Partial<User | undefined>): Observable<UserResponse> {
    return this.apiService.post('auth/local', {
      identifier: body?.username,
      password: body?.password,
    });
  }

  signIn(body: Partial<User | undefined>): Observable<UserResponse> {
    return this.apiService.post('auth/local/register', {
      username: body?.username,
      email: body?.email,
      password: body?.password,
    });
  }
}
