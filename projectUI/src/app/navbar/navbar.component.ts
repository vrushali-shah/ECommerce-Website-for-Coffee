import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MainService } from '../services/main.service';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  avatar: string
  constructor(private main: MainService, private auth: AuthenticationService) { }

  /**
   * Authenticate User and display on Navbar
   */
  ngOnInit() {
    let name="hahaha";
    if(this.auth.getUserDetails()!=null)
     name = this.auth.getUserDetails().name;
    this.avatar = "https://api.adorable.io/avatars/20/" + name;
  }

  /**
   * After successfull login, display option to Logout
   */
  onLogout() {
    this.auth.logout();
    this.main.inCart = null;
  }
}
