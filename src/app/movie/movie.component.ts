import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { 
  LOCAL_STORAGE_KEYS, 
  SIDENAV_HIGHLIGHTED_LISTS,
  SIDENAV_GENRES_LIST, 
} from '../../assets/constants';

import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { AuthComponent } from '../auth/auth.component';
import { UserListsComponent } from '../shared/components/user-lists/user-lists.component';
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
  public dialogRef: any;

  constructor(
    private activateRoute: ActivatedRoute,
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
    this.isUserLogged() ? this.addNewMovie() : this.getCredencials();
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

  public getCredencials() {
    this.dialog
      .open(AuthComponent, {width: '369px', height: '350px'})
      .afterClosed().subscribe((response) => {
        response !== '' ? this.getUserLists() : null;
      });
  }

  public getUserLists(){
    this.dialog
      .open(UserListsComponent, { height: '350px'})
  }
}
