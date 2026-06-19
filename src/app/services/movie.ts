import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_KEY = '51e6ef732d5c73a4ec36bd19e29982e3';
  private BASE_URL = 'https://api.themoviedb.org/3';
  public IMG_BASE = 'https://image.tmdb.org/t/p/';

  constructor(private http: HttpClient) {
    console.log('MovieService created!');
  }

  getTrending(): Observable<any> {
    // console.log('getTrending called!');
    return this.http.get(`${this.BASE_URL}/trending/movie/week?api_key=${this.API_KEY}`);
  }
  getUpcoming(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/movie/upcoming?api_key=${this.API_KEY}`);
  }

  getTopRated(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/movie/top_rated?api_key=${this.API_KEY}`);
  }

  getNowPlaying(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/movie/now_playing?api_key=${this.API_KEY}`);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}`);
  }

  getMovieCredits(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/movie/${id}/credits?api_key=${this.API_KEY}`);
  }

  getMovieVideos(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/movie/${id}/videos?api_key=${this.API_KEY}`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${encodeURIComponent(query)}`);
  }
}





// private API_KEY = '51e6ef732d5c73a4ec36bd19e29982e3';