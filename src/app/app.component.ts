import { Component, OnInit } from '@angular/core';
import { MoviesService } from './shared/sevices/movies.service';

@Component({
  selector: 'wb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public postBasePath: string
  constructor(
    public movieService: MoviesService
  ) {}

  ngOnInit() {
    this.movieService.getConfigImagePath().subscribe(res => {
      this.postBasePath = `${res.images.base_url}${res.images.poster_sizes[3]}/`;
      localStorage.setItem('posterBasePath', this.postBasePath);
    })
  }
}
