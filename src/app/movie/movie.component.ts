import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// import { Location } from '@angular/common';
// import { combineLatest } from 'rxjs';

import { 
  LOCAL_STORAGE_KEYS, 
  SIDENAV_HIGHLIGHTED_LISTS,
  SIDENAV_GENRES_LIST, 
} from '../../assets/constants';

import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MoviesService } from '../shared/sevices/movies.service';
import { MovieStore } from '../shared/stores/movie.store';

@Component({
  selector: 'wb-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public genre: string;
  public title: string;
  public year: string;
  public rate: string;
  public overview: string;
  public movieId: string;

  // public breadcrumbGenre: any;
  // public breadcrumbMovie: string;

  constructor(
    private activateRoute: ActivatedRoute,
    // private location: Location,
    private moviesService: MoviesService,
    private movieStore: MovieStore,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.genre = params.genre;
      this.movieStore.getMovieId().subscribe(movieId => this.getMovie(movieId));
    })
  }

  public getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe(movie => {
      this.title = movie.original_title;
      this.overview = movie.overview;
    });
  }

  public addMovie() {
    this.isUserLogged() ? this.addNewMovie() : this.openDialog();
  }

  public isUserLogged() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.isLoggedIn));
  }

  public addNewMovie() {
    this.snackBar.open(`The Movie ${this.movieId} has been added`, 'OK', {
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  public openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '350px'
    });
  }

  // public goBack(): void {
  //   this.location.back();
  // }
}
