import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

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