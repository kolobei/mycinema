import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { SharedMovieService } from 'src/app/services/shared-movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  selectedMovie: Movie;
  sourceForPic: string;

  constructor(
    private router: Router,
    private sharedService: SharedMovieService
  ) { }

  ngOnInit(): void {
    this.selectedMovie = null;
    this.selectedMovie = this.sharedService.getValue();
    if (this.selectedMovie.title != null) {
      this.sourceForPic = "https://image.tmdb.org/t/p/w500/" + this.selectedMovie.poster_path;
    }
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

}
