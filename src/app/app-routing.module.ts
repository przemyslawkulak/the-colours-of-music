import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './landing-page/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'artists',
    loadChildren: () =>
      import('./artists/artists.module').then((m) => m.ArtistsModule),
  },
  {
    path: 'albums',
    loadChildren: () =>
      import('./albums/albums.module').then((m) => m.AlbumsModule),
  },
  {
    path: 'tracks',
    loadChildren: () =>
      import('./tracks/tracks.module').then((m) => m.TracksModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}