import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class SharedMovieService {
  private tempMovie: Movie = {
    adult: false,
    id: 0,
    original_title: null,
    release_date: null,
    title: null,
    video: false,
    vote_average: 0,
    vote_count: 0,
    genres: [],
    homepage: null,
    original_language: null,
    popularity: 0,
    production_companies: [],
    revenue: 0,
    status: null,
    origin_country: null,
    production_countries: [],
    spoken_languages: [],
  };

  private movie$ = new BehaviorSubject(this.tempMovie);

  getMovie(movie: Movie) {
    this.movie$.next(movie);
  }

  getValue() {
    return this.movie$.value;
  }
}
