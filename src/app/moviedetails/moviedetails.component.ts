import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { MovieResponse, Result } from '../models/movielistmodels';
import { MovieapiService } from '../services/movieapi.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit{
  
  prefixImg ='https://image.tmdb.org/t/p/original/';
  movieId!: number;
  private subs = new SubSink();

  errorText?: string;
  overviewMovie: Result | null = null;

  constructor(
    private route : ActivatedRoute,
    private movieapiservice : MovieapiService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.movieId = Number(this.route.snapshot.params['id']);      
    })

    console.log(this.movieId);

    if(this.movieId !== null) {
      this.getSingleMovie(this.movieId)
  }
    
  }

  getSingleMovie(id: number){
    this.subs.sink = this.movieapiservice.getMovieDetail(id).subscribe({ 
      next: (response: Result) => {
        this.overviewMovie = response
        console.log(response)
      },
      error: (error: any) => {
        this.errorText= 'Error';
      }
    })

    
  }

}
