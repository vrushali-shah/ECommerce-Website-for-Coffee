import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MainService } from '../services/main.service';
import { Product } from '../models/product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { trigger, state, transition, style, animate } from '@angular/animations'
import {CurrencyPipe  } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('100ms')),
      transition('hidden => shown', animate('100ms')),
    ])
  ]
})
export class DetailComponent implements OnInit {

  selectedSize: string;
  productObservable: Observable<Product>;
  product: Product;
  size: any[] = [];
  show: boolean = false;
  price: number;
  defaultSelect: string;
  msg: string;
  isSuccess: boolean;
  @ViewChild('qty') qty: ElementRef;
  visiblityState = 'hidden';
  constructor(private main: MainService, private route: ActivatedRoute) { 
    this.defaultSelect = "small";
  }

  /**
   * Load Product details on the page
   */
  ngOnInit() {

    this.toggle.bind(this);
    
    this.selectedSize = "";
    this.addToCart.bind(this);
    
    this.route.data
     .subscribe((data: any) => {
        let index = data.main.index;
        let menu = data.main.menu;
        this.product = menu[index];
        this.size.push({ "size": "S", "name": "small" });
        this.size.push({ "size": "M", "name": "medium" });
        this.size.push({ "size": "L", "name": "large" });
      });
  }

  /**
   * Add the item to Cart
   */
  addToCart() {
    if (this.selectedSize == "") {
      this.msg = "Please select a size!";
      this.toggle();
    }
    else {
      this.isSuccess = this.main.addToCart(this.selectedSize, parseInt(this.qty.nativeElement.value), this.product);
      if (this.isSuccess) {
        this.msg = "Successfully added to cart!";
        this.toggle();
      }
    }
  }

  /**
   * Update the product price when size is changed
   * @param price {Product Price}
   */
  onSizeChange(price) {
    this.selectedSize = price;
    console.log(this.product[this.selectedSize]);
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
