import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  cardsList = [
    { title: 'Artists', routeLink: '/artists', icon: 'mic_external_on' },
    { title: 'Albums', routeLink: '/albums', icon: 'album' },
    { title: 'Tracks', routeLink: '/tracks', icon: 'audio_file' },
    { title: 'Countries', routeLink: '/countries', icon: 'travel_explore' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
