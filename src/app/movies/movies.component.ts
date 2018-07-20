import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './movies.service';

import { CATEGORIES } from '../../assets/constants';

@Component({
  selector: 'wb-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public categoryTitle: string;
  public movies: Array<any>;

  constructor(
    private activateRoute: ActivatedRoute, 
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      if (params.category === CATEGORIES.popular) {
        this.getPopularMovies();
      } else if (params.category === CATEGORIES.topRated) {
        this.getTopRatedMovies();
      } else {
        this.getUpcomingMovies();
      }
    });
  }

  public getPopularMovies() {
    this.moviesService.getPopularMovies().subscribe(category => {
      this.categoryTitle = category.title;
      this.movies = category.movies;
    })
  }

  public getTopRatedMovies() {
    this.moviesService.getTopRatedMovies().subscribe(category => {
      this.categoryTitle = category.title;
      this.movies = category.movies;
    })
  }

  public getUpcomingMovies() {
    this.moviesService.getUpcomingMovies().subscribe(category => {
      this.categoryTitle = category.title;
      this.movies = category.movies;
    })
  }
}
