import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username: string = '';
  password: string = '';
  userData!:  FormGroup;

  faCheckSquare = faCheckSquare;
  faSquare = faSquare;
  check : boolean = true;

  constructor(
    private router: Router,
    private authservice : AuthserviceService,
  ){}

  ngOnInit(): void {
    this.userData = new FormGroup({
      username: new FormControl('user@gamil.com'),
      password: new FormControl('userpassword')
    })

  }

  Submit(data: any){
    this.username = data.username;
    this.password = data.password;

    console.log(this.username);
    console.log(this.password);

    this.authservice.logIn(this.username, this.password).subscribe(data => {
      console.log("Login Success: " + data);

      if (data) this.router.navigate(['/home']);

      setTimeout(() => {
        window.location.reload();
      });
    });
  }
}
