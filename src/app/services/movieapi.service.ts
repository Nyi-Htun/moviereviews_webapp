import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieResponse, Result } from '../models/movielistmodels';
import { catchError,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieapiService {

  baseUrl = 'https://api.themoviedb.org/3'
  apikey: string = '86f99ca67e83fa5779ca583125eab979'

  constructor(
    private http : HttpClient,
  ) { }
  
  private errorHandler (err: HttpErrorResponse){
    let errorMessage: string = '';
    if (err.status === 0) {
      console.log('network error.')
    } else if (err.status === 404) {
      errorMessage = err.error?.status_message;
    }
    return throwError(() => {
      return errorMessage;
    })
  }
  
  getMovies(option : any){
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${option}?api_key=${this.apikey}`);
  }
  
  getMovieDetail(id: number) {
    return this.http.get<Result>(`${this.baseUrl}/movie/${id}?api_key=${this.apikey}`).pipe(catchError(this.errorHandler));
  }
}
