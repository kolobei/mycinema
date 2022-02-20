import { Component, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { HttpClient } from '@angular/common/http';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { SharedMovieService } from 'src/app/services/shared-movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  movies: Movie[] = [];
  movies$: BehaviorSubject<null | Movie[]> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedMovieService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data: { result: { result: any; error: string } }) => {
        if (data.result.error == null) {
          this.movies$.next(data.result.result.results);
          this.movies = this.movies$.value;
          // console.debug("ERRRRRRR")
        } else {
          this.movies$.next([]);
          this.movies = [];
          console.debug('MMMMMMMMMMM');
        }
      }
    );
    this.movies.forEach((m) => {
      console.debug(m);
    });
    this.dataSource = new MatTableDataSource(this.movies);
  }

  displayedColumns: string[] = ['name', 'release_date', 'options'];
  dataSource = new MatTableDataSource(this.movies);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  seeMovieDetails(index: number) {
    this.sharedService.getMovie(this.movies[index]);
    this.router.navigateByUrl('/movie/' + (index + 1));
  }
}
