import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations'
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { MainService } from '../services/main.service';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ViewChild } from '@angular/core/';
import { ElementRef } from '@angular/core';
import { DecisionwheelComponent } from '../decisionwheel/decisionwheel.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('100ms')),
      transition('hidden => shown', animate('100ms')),
    ])
  ]
})
export class CartComponent implements OnInit {

  cart: Order;
  productList: Array<{
    size: String;
    qty: number;
    product: Product;
  }>;
  size: any[] = [];
  total: number;
  tax: number;
  grandTotal: number;
  msg: string;
  isSuccess: boolean;
  visiblityState = 'hidden';
  saved: boolean;
  discount: number;
  used: boolean
  used2: boolean;
  @ViewChild(DecisionwheelComponent)
  private wheel: DecisionwheelComponent;

  constructor(private auth: AuthenticationService, private main: MainService, 
    private route: ActivatedRoute, private router: Router) {
    this.msg = "";
    this.discount = 0;
    this.used = false;
    this.used2 = false;
  }

  /**
   * Fetch data from API on component init
   */
  ngOnInit() {
    this.saved = true;
    this.route.data
      .subscribe((data: any) => {
        this.cart = data.main;
      });
    this.productList = this.cart.productList;
    this.size.push({ "size": "S", "name": "small" });
    this.size.push({ "size": "M", "name": "medium" });
    this.size.push({ "size": "L", "name": "large" });
    this.calcTotal(null);
  }

  confirmorder() {
  }

  cartItem(n: number): any[] {
    return Array(n);
  }

  onSizeChange(price) {
  }

  /**
   * Remove the product from the cart
   * @param item {in-line product}
   */
  removeProduct(item) {
    this.main.removeFromCart(item);
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

  /**
   * Calculates the in-line total of each product 
   * based on user increasing/decreasing the quantity
   * @param event {Product Quantity}
   */
  calcTotal(event) {
    this.total = 0;
    this.productList.forEach((item) => {
      this.total += item.product[item.size.toString()] * item.qty;
    })

    this.total -= this.discount
    this.tax = this.total * 0.0625;
    this.grandTotal = this.total + this.tax;
    this.msg = "Cart Updated. Don't forget to save!";
    this.isSuccess = true;
    this.toggle();
    this.saved = false;
  }
  calcDiscount() {
    this.discount = this.wheel.discount / 100 * this.total;
    this.calcTotal(null);
    this.wheel.discount = 0;

  }

  /**
   * Save the content of each product on the Cart
   */
  save() {
    this.main.updateCart();
    this.saved = true;
    this.msg = "Cart has been Saved successfully!";
    this.isSuccess = true;
    this.toggle();
  }

  /**
   * Checks whether the user is logged in. If not, navigates to Login page.
   * If the user is logged in, navigates to Checkout page.
   */
  onCheckout() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.main.inCart.totalCost = this.grandTotal;
    this.main.updateCart();
    this.saved = true;
    this.router.navigate(['/checkout']);
  }

  /**
   * Navigates to Menu page
   */
  goToMenu() {
    this.saved = true;
    this.router.navigate(['/menu']);
  }
  /**
   * start wheel
   */
  start() {
    this.wheel.start();
    this.used = true;
  }
  /**
   * stop wheel
   */
  stop() {
    if (this.wheel.used) {
      this.used2 = true;
      this.wheel.stop();
      this.calcDiscount();
    }
  }
  ngOnDestroy() {
    if (this.wheel != undefined)
      this.stop();
  }
}
