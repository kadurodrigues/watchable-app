import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { MoviesService } from '../shared/sevices/movies.service';

import { 
  LOCAL_STORAGE_KEYS, 
  SIDENAV_HIGHLIGHTED_LISTS, 
  SIDENAV_GENRES_LIST 
} from '../../assets/constants';

@Component({
  selector: 'wb-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies: Array<any>;
  public genreTitle: string;
  public genrePath: string;

  public postPath = localStorage.getItem('posterBasePath');

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.isLoggedIn, JSON.stringify(false));

    this.activateRoute.params.subscribe(params => {
      this.genrePath = params.genre;
      this.genreTitle = this.setListName(params.genre);
      this.isGenreType(params.genre) ? this.getGenreMovies(params.genre) : this.getHighlightsListMovies(params.genre);
    });
  }

  public setListName(path: string) {
    return [...SIDENAV_HIGHLIGHTED_LISTS, ...SIDENAV_GENRES_LIST].find(item => item.path === path).name;
  }

  public isGenreType(genre: string) {
    return [...SIDENAV_HIGHLIGHTED_LISTS, ...SIDENAV_GENRES_LIST]
      .filter(item => item.path === genre)
      .some(item => item.hasOwnProperty('id'))
  }

  public getGenreMovies(genre: string) {
    const genreId = SIDENAV_GENRES_LIST.find(item => item.path === genre).id;
    this.moviesService.getGenreMovies(genreId).subscribe(list => {
      this.movies = list.results;
    });
  }

  public getHighlightsListMovies(list: string) {
    this.moviesService.getHighlightsListMovies(list).subscribe(list => {
      this.movies = list.results;
    });
  }

  public goToMoviePage(movie: any) {
    this.router.navigate([`movies/${this.genrePath}/`, this.setStringPath(movie.title)], { queryParams: { id: movie.id } });
  }

  public setStringPath(path: string) {
    return path.replace(/[: ]+/g, '-').toLowerCase();
  }
}
