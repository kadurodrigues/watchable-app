import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MovieStore {
  private genreId: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private movieId: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {}

  public setGenreId(genreId: any) {
    this.genreId.next(genreId);
  }

  public setMovieId(movieId: any) {
    this.movieId.next(movieId);
  }

  public getGenreId() {
    return this.genreId.asObservable();
  }

  public getMovieId() {
    return this.movieId.asObservable();
  }
}