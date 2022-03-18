import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { DragableArtistCardComponent } from './dragable-artist-card/dragable-artist-card.component';
import { ArtistSidebarComponent } from './artist-sidebar/artist-sidebar.component';
import { ArtistListTableComponent } from './artist-list-table/artist-list-table.component';
import { ArtistListItemComponent } from './artist-list-item/artist-list-item.component';
import { ArtistEditModalComponent } from './artist-edit-modal/artist-edit-modal.component';
import { TrackModalFieldComponent } from './artist-edit-modal/track-modal-field/track-modal-field.component';
import { AlbumModalFieldComponent } from './artist-edit-modal/album-modal-field/album-modal-field.component';
import { TagModalFieldComponent } from './artist-edit-modal/tag-modal-field/tag-modal-field.component';
import { MiscModalFieldComponent } from './artist-edit-modal/misc-modal-field/misc-modal-field.component';

@NgModule({
  declarations: [
    ArtistListComponent,
    DragableArtistCardComponent,
    ArtistSidebarComponent,
    ArtistListTableComponent,
    ArtistListItemComponent,
    ArtistEditModalComponent,
    TrackModalFieldComponent,
    AlbumModalFieldComponent,
    TagModalFieldComponent,
    MiscModalFieldComponent,
  ],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    SharedModule,
    MatSelectCountryModule,
  ],
})
export class ArtistsModule {}
