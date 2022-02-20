import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const MOVIE_URL =
  environment.HOST +
  environment.VERSION +
  environment.DISCOVER +
  environment.KEY;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {
    console.log('MovieService constructor called...');
  }

  getAllMovies(): Observable<any> {
    return this.http
      .get<any>(MOVIE_URL);
  }

  // handle Error
  handlerError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.status_message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status_code}\nMessage: ${error.status_message}`;
    }
    return throwError(error.error);
  }
}
