import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  cardsList = [
    { title: 'Artists List', routeLink: '/artists', icon: 'mic_external_on' },
    { title: 'Albums List', routeLink: '/albums', icon: 'album' },
    { title: 'Tracks List', routeLink: '/tracks', icon: 'audio_file' },
    { title: 'Countries List', routeLink: '/countries', icon: 'travel_explore' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
