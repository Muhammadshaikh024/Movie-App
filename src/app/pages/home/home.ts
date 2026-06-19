import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MovieService } from '../../services/movie';
import { NavbarComponent } from '../../components/navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  heroMovies: any[] = [];
  currentHeroIndex = 0;
  heroInterval: any;

  trendingMovies: any[] = [];
  nowPlayingMovies: any[] = [];
  upcomingMovies: any[] = [];
  topRatedMovies: any[] = [];

  imgBase = 'https://image.tmdb.org/t/p/';

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTrending();
    this.loadNowPlaying();
    this.loadUpcoming();
    this.loadTopRated();
  }

  // ── HERO SLIDER ──
  loadTrending(): void {
    this.movieService.getTrending().subscribe({
      next: (data: any) => {
        this.trendingMovies = data.results;
        this.heroMovies = data.results.slice(0, 5); // top 5 for hero
        this.startHeroSlider();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  startHeroSlider(): void {
    this.heroInterval = setInterval(() => {
      this.currentHeroIndex =
        (this.currentHeroIndex + 1) % this.heroMovies.length;
      this.cdr.detectChanges();
    }, 5000); // change every 5 seconds
  }

  goToHeroSlide(index: number): void {
    this.currentHeroIndex = index;
    clearInterval(this.heroInterval);
    this.startHeroSlider(); // restart timer
    this.cdr.detectChanges();
  }

  prevHero(): void {
    this.currentHeroIndex =
      (this.currentHeroIndex - 1 + this.heroMovies.length) % this.heroMovies.length;
    clearInterval(this.heroInterval);
    this.startHeroSlider();
    this.cdr.detectChanges();
  }

  nextHero(): void {
    this.currentHeroIndex =
      (this.currentHeroIndex + 1) % this.heroMovies.length;
    clearInterval(this.heroInterval);
    this.startHeroSlider();
    this.cdr.detectChanges();
  }

  // ── CAROUSEL SCROLL ──
  scrollCarousel(id: string, direction: 'left' | 'right'): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollBy({ left: direction === 'left' ? -600 : 600, behavior: 'smooth' });
    }
  }

  // ── OTHER SECTIONS ──
  loadNowPlaying(): void {
    this.movieService.getNowPlaying().subscribe({
      next: (data: any) => {
        this.nowPlayingMovies = data.results;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  loadUpcoming(): void {
    this.movieService.getUpcoming().subscribe({
      next: (data: any) => {
        this.upcomingMovies = data.results;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  loadTopRated(): void {
    this.movieService.getTopRated().subscribe({
      next: (data: any) => {
        this.topRatedMovies = data.results;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  // ── CLEANUP ──
  ngOnDestroy(): void {
    clearInterval(this.heroInterval); // stop timer when leaving page
  }
}