import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor(private http: HttpClient) { }

  public getGenresList(): Observable<any> {
    return this.http.get(`${environment.API_URL}/genres`);
  }
}
