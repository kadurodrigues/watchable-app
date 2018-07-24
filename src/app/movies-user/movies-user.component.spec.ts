import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesUserComponent } from './movies-user.component';

describe('MoviesUserComponent', () => {
  let component: MoviesUserComponent;
  let fixture: ComponentFixture<MoviesUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
