import { Component, OnInit } from '@angular/core';
import { ArtistsService } from '@shared/services/artists/artists.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
})
export class ArtistListComponent implements OnInit {
  constructor(private _artistsService: ArtistsService) {}

  ngOnInit(): void {
    this._artistsService
      .getArtists(0, 120)
      .subscribe((data) => console.log(data));
  }
}
