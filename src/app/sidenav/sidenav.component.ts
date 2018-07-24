import { Component, OnInit } from '@angular/core';
import { SIDENAV_ITEMS } from '../../assets/constants';

@Component({
  selector: 'wb-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public items: Array<any>
  constructor() { }

  ngOnInit() {
    this.items = SIDENAV_ITEMS.map(item => item);
  }

}
