import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ArtistListComponent],
  imports: [CommonModule, ArtistsRoutingModule, SharedModule],
})
export class ArtistsModule {}
