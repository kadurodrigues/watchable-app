import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesUserComponent } from './movies-user/movies-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies/popular', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:genre', component: MoviesComponent, data: { name } },
  { path: 'movies/:genre/:movieTitle', component: MovieComponent },
  { path: 'my-lists/:list', component: MoviesUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
