import { Component, Input, HostListener } from '@angular/core';
import { Movie, GENRE_MAP } from '../../services/movie.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  providers: [DatePipe],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movie?: Movie;
  showDescription = false;
  GENRE_MAP = GENRE_MAP;

  get genreNames(): string[] {
    return this.movie?.genre_ids.map(id => GENRE_MAP[id]) ?? [];
  }

  toggleDescription(event: MouseEvent) {
    event.stopPropagation();
    this.showDescription = !this.showDescription;
  }

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent) {
    const card = (e.target as HTMLElement).closest('.movie-card') as HTMLElement;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = ((y / rect.height) - 0.5) * -20;

    card.style.transform =
      `scale(1.05) translateY(-6px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  }

  @HostListener('mouseleave')
  onLeave() {
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach((c) => {
      (c as HTMLElement).style.transform =
        "scale(1) translateY(0) rotateY(0deg) rotateX(0deg)";
    });
  }
}