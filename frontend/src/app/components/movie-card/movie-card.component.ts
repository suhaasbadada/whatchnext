import { Component, Input } from '@angular/core';
import { Movie, GENRE_MAP } from '../../services/movie.service';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  providers: [DatePipe, DecimalPipe],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movie?: Movie;
  GENRE_MAP = GENRE_MAP;

  get genreNames(): string[] {
    return this.movie?.genre_ids
      ?.map(id => GENRE_MAP[id])
      ?.filter(name => name !== undefined) ?? [];
  }
}