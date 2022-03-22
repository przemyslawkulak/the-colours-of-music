import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CountryActions } from './root-store/action-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'the-colours-of-music';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(CountryActions.loadCountries());
  }
}
