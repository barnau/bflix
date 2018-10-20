import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './components/my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatMenuModule, MatGridListModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MovieListComponent } from './components/movie/movie-list.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { NoRightsComponent } from './components/login/no-rights.component';
import { MovieThumbnailComponent } from './components/movie/movie-thumbnail.component';
import { MovieResolverService } from './components/movie/movie-resolver.service';
import { MoviePlayerComponent } from './components/movie/movie-player.component';

const appRoutes: Routes = [
  {
    path: 'movies',
    resolve: { movies: MovieResolverService },
    component: MovieListComponent,
    data: { title: 'Movie List' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: 'norights',
    component: NoRightsComponent
  },
  { path: 'player/:id',
    component: MoviePlayerComponent
  },
  { path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/movies',
  }

];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    LoginComponent,
    SignupComponent,
    MovieListComponent,
    NoRightsComponent,
    MovieThumbnailComponent,
    MoviePlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,
    { enableTracing: true}),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule
  ],
  providers: [MovieResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
