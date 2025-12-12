import { Component, Input } from '@angular/core';
import { Movie } from '../../services/movie.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movie?: Movie;
  showDescription = false;

  toggleDescription(event: MouseEvent) {
    event.stopPropagation(); 
    this.showDescription = !this.showDescription;
  }
}