import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserDetails } from '../models/UserDetails';
import { MainService } from '../services/main.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Order } from '../models/order';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  details: UserDetails;
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  avatar:string;
  selectedOrder:Order;
  constructor(private auth: AuthenticationService, private main: MainService,private route: ActivatedRoute,
    private router: Router) { }

  /**
   * Authenticate user and fetch User details from API to display on the page
   */
  ngOnInit() {
    if (this.auth.getToken()) {
      this.route.data
    .subscribe((data: any) => {
      this.details = data.main;
      this.main.setInCart(this.details.inCart);
    });
    let name="hahaha";
    if(this.auth.getUserDetails()!=null)
     name = this.auth.getUserDetails().name;
    this.avatar = "https://api.adorable.io/avatars/110/" + name;
    }
  }
}
