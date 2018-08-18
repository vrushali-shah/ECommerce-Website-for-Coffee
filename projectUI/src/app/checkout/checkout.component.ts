import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoresComponent } from '../stores/stores.component';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { MainService } from '../services/main.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('100ms')),
      transition('hidden => shown', animate('100ms')),
    ])
  ]
})
export class CheckoutComponent implements OnInit {

  //myForm: FormGroup
  msg: string;
  isSuccess: boolean;
  visiblityState = 'hidden';
  @ViewChild(StoresComponent) private stores: StoresComponent;

  constructor(private main: MainService, private route: ActivatedRoute, private router: Router) {
    this.msg = "";
  }


  ngOnInit() {

   // Check if Order inCart is present. If not,navigate to Cart page.
   
    if (this.main.inCart == null || this.main.inCart == undefined) {
      this.router.navigate(['/cart']);
      return;
    }
  }
  ngAfterViewInit() {

  }

  /**
   * Alert if no store is selected.
   * Navigate to Payment page when store is selected.
   */
  toPay() {
    if (this.stores.selectedStore == null || this.stores.selectedStore == undefined) {
      this.msg = "No store was selected!";
      this.isSuccess = false;
      this.toggle();
    }
    else {

      this.main.inCart.placeName = this.stores.selectedStore.name;
      this.main.inCart.placeAddress = this.stores.selectedStore.vicinity;
      this.router.navigate(['/payment']);
    }
  }

  /**
   * Displays a toast message
   */
  toggle() {
    if (this.visiblityState === 'hidden') {
      this.visiblityState = 'shown'
      setTimeout(() => this.toggle(), 3000);
    }
    else
      this.visiblityState = 'hidden';
  }
}
