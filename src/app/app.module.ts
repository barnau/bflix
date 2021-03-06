import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule} from '@angular/flex-layout'
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule} from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './components/my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatMenuModule, MatGridListModule, MatButtonToggleModule, MatTreeModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatStepperModule, MatDialogModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MovieListComponent } from './components/movie/movie-list.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { NoRightsComponent } from './components/login/no-rights.component';
import { MovieThumbnailComponent } from './components/movie/movie-thumbnail.component';
import { MovieResolverService } from './components/movie/movie-resolver.service';
import { MoviePlayerComponent } from './components/movie/movie-player.component';
import { TvListComponent } from './components/tv/tv-list.component';
import { TvThumbnailComponent } from './components/tv/tv-thumbnail.component';
import { TvDetailComponent } from './components/tv/tv-detail.component';
import { TvShowTreeComponent } from './components/tv/tv-show-tree.component';
import { TvResolverService } from './components/tv/tv-resolver.service';
import { TvDetailResolverService } from './components/tv/tv-detail-resolver.service';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { DisplayAutocompleteMoviesComponent } from './components/display-autocomplete/display-autocomplete.component';
import { CreateMovieComponent } from './components/admin/create-movie/create-movie.component';
import { imageUploadDialogComponent } from './components/shared/upload/dialog/dialog.component';

import { FileSelectDirective } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  {
    path: 'movies/:genre',
    resolve: { movies: MovieResolverService },
    component: MovieListComponent,
    data: { title: 'Movie List' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'movies',
    resolve: { movies: MovieResolverService },
    component: MovieListComponent,
    data: { title: 'Movie List' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'tv/:genre',
    resolve: { tvshows: TvResolverService },
    component: TvListComponent,
    data: { title: 'TV List' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'tv',
    resolve: { tvshows: TvResolverService },
    component: TvListComponent,
    data: { title: 'TV List' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'tvdetails/:id',
    resolve: { tvshow: TvDetailResolverService },
    component: TvDetailComponent,
    data: { title: 'TV Details' },
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
    path: 'createmovie',
    component: CreateMovieComponent,
    data: { title: 'Create Movie' }
  },
  {
    path: 'norights',
    component: NoRightsComponent
  },
  { path: 'player/:loc',
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
    MoviePlayerComponent,
    TvListComponent,
    TvListComponent,
    TvThumbnailComponent,
    TvDetailComponent,
    TvShowTreeComponent,
    AutocompleteComponent,
    DisplayAutocompleteMoviesComponent,
    CreateMovieComponent,
    imageUploadDialogComponent,
    FileSelectDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,
    { enableTracing: true}),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatStepperModule,
    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [imageUploadDialogComponent],
  providers: [MovieResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
