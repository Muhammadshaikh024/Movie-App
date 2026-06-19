import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail';
import { SearchComponent } from './pages/search/search';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '' }
];