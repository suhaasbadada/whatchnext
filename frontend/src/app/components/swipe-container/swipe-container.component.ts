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
    this.swipeDirection = null; // reset animation class
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

    // Set swipe direction to trigger CSS animation
    this.swipeDirection = action;

    // Wait for animation to finish before loading next movie
    setTimeout(() => {
      this.movieService.swipe(this.movie!.id, action).subscribe({
        next: () => this.loadNextMovie(),
        error: err => console.error(err),
      });
    }, 300); // match your CSS animation duration
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