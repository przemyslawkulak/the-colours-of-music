import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, noop } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService
  ) {
    this.form = fb.group(
      {
        username: ['archer87', [Validators.required]],
        email: ['archer87@o2.pl', [Validators.required, Validators.email]],
        password: [
          'Test1234',
          [
            Validators.compose([
              Validators.minLength(8),
              Validators.required,
              Validators.pattern(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'
              ), //this is for the letters (both uppercase and lowercase) and numbers validation
            ]),
          ],
        ],
        confirmPassword: ['Test1234', [Validators.required]],
        role: [1],
      },
      {
        validators: [this.mustMatch('password', 'confirmPassword')],
      }
    );
  }

  ngOnInit(): void {}

  signIn() {
    const val = this.form.value;

    this._authService
      .signIn({
        username: val.username,
        password: val.password,
        email: val.email,
      })
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/');
        })
      )
      .subscribe(noop, () => alert('Login Failed'));
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        console.log(
          this.form?.controls['confirmPassword']?.hasError('mustMatch')
        );
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
