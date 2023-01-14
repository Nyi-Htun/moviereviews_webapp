import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass, faBell, faUserLarge, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthserviceService } from './services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'angular_netflix_web';
  faMagnifyingGlass = faMagnifyingGlass;
  faBell = faBell;
  faUsers = faUserLarge;
  faArrowRightFromBracket = faArrowRightFromBracket;

  isLoggedIn?: boolean;

  constructor(private authService: AuthserviceService) { }

  ngOnInit() {
    let storeData = sessionStorage.getItem("userLogin");
    console.log("StoreData: " + storeData);

    if (storeData != null && storeData == "true") {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }
  

}
