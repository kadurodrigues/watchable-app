import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  public getConfigImagePath(): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/configuration?api_key=${environment.apiKey}`
    );
  }

  public getHighlightsListMovies(list: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/movie/${list}?api_key=${environment.apiKey}&language=en-US&page=1`
    );
  }
  
  public getGenreMovies(genreId: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/genre/${genreId}/movies?api_key=${environment.apiKey}&language=en-US&page=1`
    );
  }

  public getMovie(id: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/movies?id=${id}`);
  }
}
