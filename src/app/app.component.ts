import { Component, OnInit } from '@angular/core';
import { MoviesService } from './shared/sevices/movies.service';
import { LOCAL_STORAGE_KEYS } from '../assets/constants';

@Component({
  selector: 'wb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public postBasePath: string;

  constructor( public movieService: MoviesService ) {}

  ngOnInit() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.isLoggedIn, JSON.stringify(false));

    this.movieService.getConfigImagePath().subscribe(res => {
      this.postBasePath = `${res.images.base_url}${res.images.poster_sizes[3]}/`;
      localStorage.setItem('posterBasePath', this.postBasePath);
    })
  }
}
