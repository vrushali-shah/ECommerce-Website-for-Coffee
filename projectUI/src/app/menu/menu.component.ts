import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { Product } from '../models/product';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ElementSchemaRegistry } from '@angular/compiler';
import { trigger, state, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('100ms')),
      transition('hidden => shown', animate('100ms')),
    ])
  ]
})
export class MenuComponent implements OnInit {
  selectedSize: string;
  size: string[] = ["S", "M", "L"];
  searchText: string;
  menu: Array<Product>;
  inputSearch: string;
  msg: string;
  isSuccess: boolean;
  visiblityState = 'hidden';
  constructor(private main: MainService, private route: ActivatedRoute, private router: Router, ) {
    this.searchText = "";
  }

  /**
   * Fetch product details from API to display on browser
   */
  ngOnInit() {

    this.toggle.bind(this);
    this.addToCart.bind(this);

    this.route.data
      .subscribe((data: any) => {
        this.searchText = data.main.search;
        this.menu = data.main.menu;
      });
  }

  /**
   * Search the product from Menu based on user input
   * @param prod
   */
  showProduct(prod: Product) {
    //search code
    if (this.searchText == null || this.searchText.trim() == "")
      return true;
    else {
      let searchRE = new RegExp(this.searchText, "i");
      if (searchRE.test(prod.description) || searchRE.test(prod.name))
        return true;
      else
        return false;
    }

  }

  /**
   * Reload the page when the search input is blank
   */
  newSearch() {
    if (this.inputSearch != null || this.inputSearch.trim() != "")
      this.router.navigate(['/menu', { search: this.inputSearch }]);
  }

  /**
   * Add item to cart and display success message
   * @param product
   */
  addToCart(product) {

    this.isSuccess = this.main.addToCart("small", 1, product);
    if (this.isSuccess) {
      this.msg = "Successfully added to cart!";
      this.toggle();
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
