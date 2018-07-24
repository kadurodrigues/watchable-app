import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wb-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() category: string;
  @Input() title: string;
  @Output() previousPage: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public backToPreviousPage(): void {
    this.previousPage.emit();
  }

}
