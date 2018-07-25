import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { MoviesService } from '../shared/sevices/movies.service';

import { LOCAL_STORAGE_KEYS, SIDENAV_HIGHLIGHTED_LISTS } from '../../assets/constants';

@Component({
  selector: 'wb-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies: Array<any>;
  public genreTitle: string;
  public genrePath: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.isLoggedIn, JSON.stringify(false));

    this.activateRoute.params.subscribe(params => {
      this.genrePath = params.genre;
      this.genreTitle = SIDENAV_HIGHLIGHTED_LISTS.find(item => item.path === params.genre).name;
      this.getMovies(params.genre);
    });
  }


  public getMovies(genre: string) {
    this.moviesService.getMovies(genre).subscribe(list => {
      this.movies = list.movies;
    });
  }

  public goToMoviePage(movie: any) {
    this.router.navigate([`movies/${this.genrePath}/`, this.setStringPath(movie.title)], { queryParams: { id: movie.id } });
  }

  public setStringPath(path: string) {
    return path.replace(/[: ]+/g, '-').toLowerCase();
  }
}
