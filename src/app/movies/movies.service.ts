import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Movie } from '../shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  public getMovies(category: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/${category}`)            
  }

  public getMovie(id: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/movies?id=${id}`);
  }
}
