import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wb-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() genre: string;
  @Input() movie: string;
  @Output() previousPage: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public backToPreviousPage(): void {
    this.previousPage.emit();
  }

}
