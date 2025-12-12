import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}
export const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV-Film',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};
@Injectable({ providedIn: 'root' })
export class MovieService {
  private base = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getNextMovie(): Observable<Movie> {
    return this.http.get<{ movie: Movie }>(`${this.base}/next_movie`).pipe(
      map(res => res.movie),
      catchError(this.handleError)
    );
  }

  swipe(movieId: number, action: 'left' | 'right' | 'up'): Observable<any> {
    return this.http.post(`${this.base}/swipe`, { movie_id: movieId, action }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.error('MovieService error', err);
    return throwError(() => err);
  }
}