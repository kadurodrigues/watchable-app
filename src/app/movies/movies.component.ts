import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MoviesService } from './movies.service';

import { LOCAL_STORAGE_KEYS } from '../../assets/constants';

@Component({
  selector: 'wb-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies: Array<any>;
  public category: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router, 
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.isLoggedIn, JSON.stringify(false));

    this.activateRoute.params.subscribe(params => {
      this.category = params.category;
      this.getMovies(params.category);
    });
  }

  public getMovies(category: string) {
    this.moviesService.getMovies(category).subscribe(category => {
      this.movies = category.movies;
    })
  }

  public goToMoviePage(movie: any) {
    this.router.navigate([`/movies/${this.category}/`, this.setStringPath(movie.title)], { queryParams: { id: movie.id } });
  }

  public setStringPath(path: string) {
    return path.replace(/[: ]+/g, '-').toLowerCase();
  }
}
