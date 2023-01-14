import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieResponse, Result } from '../models/movielistmodels';
import { MovieapiService } from '../services/movieapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private movieapiservice : MovieapiService,
    private router : Router,
  ){ }
  
  prefixImg ='https://image.tmdb.org/t/p/original/';

  topratedmovies?:Result[];
  popularmovies?:Result[];
  nowplayingmovies?:Result[];

  isLoggedIn : boolean = false;

  ngOnInit(): void {
    
  this.movieapiservice.getMovies('top_rated').subscribe((respose: MovieResponse)=>{
  this.topratedmovies = respose.results })
  
  this.movieapiservice.getMovies('popular').subscribe((respose: MovieResponse)=>{
  this.popularmovies = respose.results  })
    
  this.movieapiservice.getMovies('now_playing').subscribe((respose: MovieResponse)=>{
  this.nowplayingmovies = respose.results  })
  
  }

  gotoDetail(id: number){
    let storeData = sessionStorage.getItem("userLogin");
    console.log("StoreData: " + storeData);

    if (storeData != null && storeData == "true") {
      this.isLoggedIn = true;
      this.router.navigate(['/moviedetails',id]);
    }
    else {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }

}
