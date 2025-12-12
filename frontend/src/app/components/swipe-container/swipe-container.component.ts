import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, Movie } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-swipe-container',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './swipe-container.component.html',
  styleUrls: ['./swipe-container.component.css'],
})
export class SwipeContainerComponent {
  movie?: Movie;
  loading = false;
  swipeDirection: 'left' | 'right' | 'up' | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadNextMovie();
  }

  loadNextMovie() {
    this.loading = true;
    this.movieService.getNextMovie().subscribe({
      next: movie => {
        this.movie = movie;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  swipe(action: 'left' | 'right' | 'up') {
    if (!this.movie) return;

    this.swipeDirection = action;

    // Reset animation after 300ms
    setTimeout(() => {
      this.swipeDirection = null;
    }, 300);

    this.movieService.swipe(this.movie.id, action).subscribe({
      next: () => this.loadNextMovie(),
      error: err => console.error(err),
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.movie) return;

    switch (event.key) {
      case 'ArrowRight':
        this.swipe('right');
        break;
      case 'ArrowLeft':
        this.swipe('left');
        break;
      case 'ArrowUp':
        this.swipe('up');
        break;
    }
  }
}