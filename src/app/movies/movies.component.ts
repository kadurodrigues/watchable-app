import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { MoviesService } from '../shared/sevices/movies.service';
import { MovieStore } from '../shared/stores/movie.store';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { 
  SIDENAV_HIGHLIGHTED_LISTS, 
  SIDENAV_GENRES_LIST 
} from '../../assets/constants';

@Component({
  selector: 'wb-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies$: Observable<any[]>;
  public genre: string;
  public genreId: number;

  public postPath = localStorage.getItem('posterBasePath');
  public loadArray = new Array(10);

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
    private movieStore: MovieStore,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.genre = params.genre;
      this.movieStore.getGenreId().subscribe(genreId => this.genreId = genreId);
      this.genreId ? this.getGenreMovies(this.genreId) : this.getHighlightsListMovies(params.genre);
    });
  }

  public getGenreMovies(genreId: number) {
    this.movies$ = this.moviesService.getGenreMovies(genreId).pipe(
      map(res => res.results),
      catchError(this.handleError.bind(this))
    );

    this.movieStore.setGenreId(null);
  }

  public getHighlightsListMovies(list: string) {
    this.movies$ = this.moviesService.getHighlightsListMovies(list).pipe(
      map(res => res.results),
      catchError(this.handleError.bind(this))
    );
  }

  public goToMoviePage(movie: any) {
    this.movieStore.setMovieId(movie.id);
    this.router.navigate([`movies/${this.genre}/`, this.setStringPath(movie.title)]);
  }

  public setStringPath(path: string) {
    return path.replace(/[: ]+/g, '-').toLowerCase(); 
  }

  public handleError(error) {
    this.snackBar.open(error.error.status_message, 'OK', {
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
