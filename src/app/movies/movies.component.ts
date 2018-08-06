import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import { MoviesService } from '../shared/sevices/movies.service';
import { MovieStore } from '../shared/stores/movie.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  public listTitle: string;
  public listPath: string;
  public genreId: number;

  public postPath = localStorage.getItem('posterBasePath');
  public loadArray = new Array(10);

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
    private movieStore: MovieStore
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.listPath = params.genre;
      this.movieStore.getGenreId().subscribe(genreId => this.genreId = genreId);
      this.genreId ? this.getGenreMovies(this.genreId) : this.getHighlightsListMovies(params.genre);
    });
  }

  public setListName(path: string) {
    return [...SIDENAV_HIGHLIGHTED_LISTS, ...SIDENAV_GENRES_LIST].find(item => item.path === path).name;
  }

  public getGenreMovies(genreId: number) {
    this.movies$ = this.moviesService.getGenreMovies(genreId).pipe(map(res => res.results));
    this.movieStore.setGenreId(null);
  }

  public getHighlightsListMovies(list: string) {
    this.movies$ = this.moviesService.getHighlightsListMovies(list).pipe(map(res => res.results));
  }

  public goToMoviePage(movie: any) {
    this.movieStore.setMovieId(movie.id);
    this.router.navigate([`movies/${this.listPath}/`, this.setStringPath(movie.title)]);
  }

  public setStringPath(path: string) {
    return path.replace(/[: ]+/g, '-').toLowerCase();
  }
}
