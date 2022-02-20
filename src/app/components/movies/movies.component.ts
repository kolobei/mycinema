import { Component, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { HttpClient } from '@angular/common/http';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';


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

  constructor(private activatedRoute: ActivatedRoute,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data: { result: { result: any; error: string } }) => {
        if (data.result.error == null) {
          this.movies = data.result.result.results;
          console.debug("ERRRRRRR")
        } else {
          // this.movies$.next([]);
          this.movies = [];
          console.debug("MMMMMMMMMMM")
        }
      }
    );
    this.movies.forEach((m) => {
      console.debug(m);
    });
    this.dataSource = new MatTableDataSource(this.movies);
  }

  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource(this.movies);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Αντικείμενα ανά σελίδα'
    // this.paginator._intl.nextPageLabel = 'Nächste';
    // this.paginator._intl.previousPageLabel = 'Vorherige';
  }
}
