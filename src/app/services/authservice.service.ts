import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  userLogin : boolean = false;

  constructor(
    private router : Router
  ) { }

  logIn(username: string, password: string):Observable<any>{
    this.userLogin = username == "user@gamil.com" && password == "userpassword";
    sessionStorage.setItem('userLogin',this.userLogin? "true" : "false")

    return of(this.userLogin).pipe(
      delay(1000),
    );
  }

  logOut(): void{
    this.userLogin = false;
    sessionStorage.removeItem('userLogin');

    this.router.navigate(['/home']);

    setTimeout(()=>{
      window.location.reload();
    }, 1000);
  }
}
