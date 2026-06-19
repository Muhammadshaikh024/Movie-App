import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie';
import { NavbarComponent } from '../../components/navbar/navbar';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent implements OnInit {
  movies: any[] = [];
  query: string = '';
  imgBase = 'https://image.tmdb.org/t/p/';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.searchMovies();
      }
    });
  }

  searchMovies(): void {
    this.movieService.searchMovies(this.query).subscribe({
      next: (data: any) => {
        this.movies = data.results;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}