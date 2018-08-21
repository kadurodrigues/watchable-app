import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_KEY, LANG } from '../../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  public getConfigImagePath(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/configuration?api_key=${API_KEY}`);
  }

  public getHighlightsListMovies(list: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/movie/${list}?api_key=${API_KEY}${LANG}&page=1`);
  }
  
  public getGenreMovies(genreId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/genre/${genreId}/movies?api_key=${API_KEY}${LANG}&page=1`)
  }

  public getMovie(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/movie/${id}?api_key=${API_KEY}${LANG}`);
  }
}
