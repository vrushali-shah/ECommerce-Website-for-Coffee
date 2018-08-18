import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { MainService } from '../services/main.service';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  myForm: FormGroup
 
  constructor(private main: MainService,private route: ActivatedRoute,
    private router: Router) { }

  /**
   * Validations for user input
   */
  ngOnInit() {
    
    this.myForm = new FormGroup({
      holderName: new FormControl("", Validators.required),
      cardNumber: new FormControl("", [
        Validators.required,
        Validators.pattern('[0-9]{16}')
      ]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{3,4}')
      ]),
      month:new FormControl("",Validators.required),
      year:new FormControl("",Validators.required)
    });
  }

  /**
   * Navigate to Cart if cart is empty.
   * Else navigate to cnfirmation page.
   */
  onSubmit() {
    if(this.main.inCart==null || this.main.inCart==undefined)
    {
      this.router.navigate(['/cart']);
      return;
    }
    
    this.main.inCart.payment=this.myForm.value;
    console.log(this.main.inCart.payment);
    this.main.inCart.orderDate=new Date();
    
    this.main.confirmOrder();
    let oldOrder=Object.assign(this.main.inCart);
    this.main.inCart=null;
  }
}
