import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { HttpClient } from '@angular/common/http';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { SharedMovieService } from 'src/app/services/shared-movie.service';
import { mixinHasStickyInput } from '@angular/cdk/table';
import { SubscriptionsContainer } from 'src/app/helpers/subscriptions-container';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  movies: Movie[] = [];
  movies$: BehaviorSubject<null | Movie[]> = new BehaviorSubject(null);

  subs = new SubscriptionsContainer();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedMovieService
  ) {}

  ngOnInit(): void {
    this.subs.add = this.activatedRoute.data.subscribe(
      (data: { result: { result: any; error: string } }) => {
        if (data.result.error == null) {
          this.movies$.next(data.result.result.results);
          this.movies = this.movies$.value;
        } else {
          this.movies$.next([]);
          this.movies = [];
        }
      }
    );
    // this.movies.forEach((m) => {
    //   console.debug(m);
    // });
    this.dataSource = new MatTableDataSource(this.movies);
  }

  displayedColumns: string[] = ['name', 'release_date', 'options'];
  dataSource = new MatTableDataSource(this.movies);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  seeMovieDetails(id: number) {
    let selectedMovie = [];
    selectedMovie = this.movies.filter((m) => m.id === id);
    selectedMovie.forEach((d) => {
      console.debug(d);
    });
    this.sharedService.getMovie(selectedMovie[0]);
    this.router.navigateByUrl('/movie/' + id);
  }

  ngOnDestroy() {
    this.subs.dispose();
  }
}
