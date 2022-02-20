import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesListResolverService
  implements Resolve<{ result: any; error: string }>
{
  constructor(private movieService: MovieService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | { result: any[]; error: string }
    | Observable<{ result: any[]; error: string }>
    | Promise<{ result: any[]; error: string }> {
    return this.movieService.getAllMovies().pipe(
      map((result) => ({ result: result, error: null })),
      catchError((error) => {
        const message = `${error.status_message}`;
        return of({ result: null, error: message });
      })
    );
  }
}
