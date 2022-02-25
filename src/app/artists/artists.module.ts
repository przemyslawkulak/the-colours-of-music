import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { DragableArtistCardComponent } from './dragable-artist-card/dragable-artist-card.component';
import { ArtistSidebarComponent } from './artist-sidebar/artist-sidebar.component';
import { ArtistListTableComponent } from './artist-list-table/artist-list-table.component';

@NgModule({
  declarations: [ArtistListComponent, DragableArtistCardComponent, ArtistSidebarComponent, ArtistListTableComponent],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    SharedModule,
    MatSelectCountryModule,
  ],
})
export class ArtistsModule {}
