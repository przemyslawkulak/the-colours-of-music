import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, noop } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      username: ['archer', [Validators.required]],
      password: [
        'test1234',
        [Validators.compose([Validators.minLength(8), Validators.required])],
      ],
    });
  }

  ngOnInit(): void {}

  login() {
    const val = this.form.value;

    this._authService
      .login({
        username: val.username,
        password: val.password,
      })
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/');
        })
      )
      .subscribe(noop, () => alert('Login Failed'));
  }
}
