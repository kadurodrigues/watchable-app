import { Component, OnInit } from '@angular/core';
import { SIDENAV_HIGHLIGHTED_LISTS } from '../../assets/constants';
import { Sidenav } from './sidenav.model';
import { Router } from '@angular/router';

import { SidenavService } from './sidenav.service';
import { MovieStore } from '../shared/stores/movie.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wb-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public highlightedLists: Array<any>;
  public genresList: Array<Sidenav>;

  constructor(
    private sidenavService: SidenavService,
    private movieStore: MovieStore,
    private router: Router,
  ) { }

  ngOnInit() {
    this.highlightedLists = SIDENAV_HIGHLIGHTED_LISTS.map(list => list);
    this.sidenavService.getGenresList().subscribe(genres => {
      this.genresList = genres.map(genre => this.setGenrePath(genre));
    });
  }

  public navigateToGenreList(genre: any) {
    this.movieStore.setGenreId(genre.id);
  }

  public setGenrePath(genre: any) {
    return Object.assign({ path: genre.name.replace(/ /g, '-').toLowerCase() }, genre);
  }
}
