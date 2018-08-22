import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {
  LOCAL_STORAGE_KEYS,
  SIDENAV_HIGHLIGHTED_LISTS,
  SIDENAV_GENRES_LIST
} from '../../assets/constants';

import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { AuthComponent } from '../auth/auth.component';
import { UserListsComponent } from '../shared/components/user-lists/user-lists.component';
import { MoviesService } from '../shared/services/movies.service';
import { UsersService } from '../shared/services/users.service';
import { MovieStore } from '../shared/stores/movie.store';
import { map } from 'rxjs/operators';

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
    private usersServices: UsersService,
    private movieStore: MovieStore,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.genre = params.genre;
      this.movieStore.getMovieId().subscribe(movieId => this.getMovie(movieId));
    });
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
      duration: 2000
    });
  }

  public getCredencials() {
    this.dialog
      .open(AuthComponent, { width: '369px', height: '350px' })
      .afterClosed()
      .subscribe(userUID => {
        if (userUID !== '') {
          this.getUser(userUID);
        }
      });
  }

  public getUser(userUID: string) {
    this.usersServices.getUser(userUID)
      .then(response => this.onGetUserSuccessfull(response.data()))
      .catch(error => this.onGetUserFailed(error));
  }

  public onGetUserSuccessfull(user) {
    this.dialog.open(UserListsComponent, {
      data: user,
      width: '350px',
      height: '350px'
    });
  }

  public onGetUserFailed(error) {
    this.snackBar.open(error.message, 'OK', {
      verticalPosition: 'top',
      duration: 2000
    });
  }

  public getUserLists(user) {
    return user.lists;
  }
}
