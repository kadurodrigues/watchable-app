import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing.modules';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesUserComponent } from './movies-user/movies-user.component';
import { BreadcrumbComponent } from './movie/breadcrumb/breadcrumb.component';

import { SidenavService } from './sidenav/sidenav.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    MoviesComponent,
    MovieComponent,
    MoviesUserComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    AppRoutingModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
