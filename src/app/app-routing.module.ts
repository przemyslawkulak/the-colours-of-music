import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { UserGuard } from './user/user.guard';
import { userRoutes } from './user/user.module';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'auth',
    children: userRoutes,
  },
  {
    path: 'artists',
    loadChildren: () =>
      import('./artists/artists.module').then((m) => m.ArtistsModule),
    canActivate: [UserGuard],
  },
  {
    path: 'albums',
    loadChildren: () =>
      import('./albums/albums.module').then((m) => m.AlbumsModule),
    canActivate: [UserGuard],
  },
  {
    path: 'tracks',
    loadChildren: () =>
      import('./tracks/tracks.module').then((m) => m.TracksModule),
    canActivate: [UserGuard],
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
