import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';

import { LOCAL_STORAGE_KEYS } from '../../assets/constants';

import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'wb-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public title: string;
  public year: string;
  public rate: string;
  public overview: string;
  public movieId: string;

  public categoryBreadcrumb: string;
  public titleBreadcrumb: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private location: Location,
    private moviesService: MoviesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    combineLatest(
      this.activateRoute.params,
      this.activateRoute.queryParams,
      (params: Params, qparams: Params) => ({ params, qparams })).subscribe(allParamns => {
        this.categoryBreadcrumb = allParamns.params.category;
        this.titleBreadcrumb = allParamns.params.movieTitle;
        this.movieId = allParamns.qparams.id;
        this.getMovie(this.movieId);
      });
  }

  public getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe(movie => {
      movie.map(resp => {
        this.title = resp.title;
        this.overview = resp.overview;
      });
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

  public goBack(): void {
    this.location.back();
  }
}
