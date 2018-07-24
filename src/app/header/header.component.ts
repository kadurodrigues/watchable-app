import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LIST_MOVIES_USER } from '../../assets/constants';

@Component({
  selector: 'wb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public lists: Array<any>;

  constructor(private router: Router, ) { }

  ngOnInit() {
    this.lists = LIST_MOVIES_USER.map(list => list);
  }

  public goToListPage(list: any) {
    this.router.navigate([`/my-lists/`, this.setStringPath(list.title)]);
  }

  public setStringPath(path: string) {
    return path.replace(/[: ]+/g, '-').toLowerCase();
  }
}
