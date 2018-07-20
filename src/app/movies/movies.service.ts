import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  public getPopularMovies(): Observable<any> {
    return this.http.get(`${environment.popularURL}`)            
  }

  public getTopRatedMovies(): Observable<any> {
    return this.http.get(`${environment.topRatedURL}`)            
  }

  public getUpcomingMovies(): Observable<any> {
    return this.http.get(`${environment.upComingURL}`)            
  }
}
