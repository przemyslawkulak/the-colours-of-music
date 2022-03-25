import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMenuComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private _authService: AuthService) {
    this.isLoggedIn$ = this._authService.isLoggedIn$;
    this.isLoggedOut$ = this._authService.isLoggedOut$;
  }

  ngOnInit(): void {}
  logout() {
    this._authService.logout();
  }
}
