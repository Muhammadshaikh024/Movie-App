import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie';
import { NavbarComponent } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetailComponent implements OnInit {
  movie: any = null;
  cast: any[] = [];
  imgBase = 'https://image.tmdb.org/t/p/';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMovie(id);
    this.loadCast(id);
  }

  loadMovie(id: number): void {
    this.movieService.getMovieDetails(id).subscribe({
      next: (data: any) => {
        this.movie = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  loadCast(id: number): void {
    this.movieService.getMovieCredits(id).subscribe({
      next: (data: any) => {
        this.cast = data.cast.slice(0, 10);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}