import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { UserDetails } from '../models/UserDetails';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
interface TokenResponse {
  token: string;
}
@Injectable()
export class MainService {

  inCart: Order;
  menu: Array<Product>;
  cartInterval: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
  };
  constructor(private auth: AuthenticationService, private http: HttpClient, private router: Router) {
    this.inCart = null;
  }

  /**
   * Send user input to Google API to get cafes
   * @param zipcode {User inputs address/zipcode}
   */
  public getLocationFromZip(zipcode: string): Observable<any> {
    let base = this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="
      + zipcode
      + "&key=AIzaSyAly2_tJUskaQoxaf7CY2kMD2SRqU2gPCo")
    return this.processor(base);
  }

  public getInCartObservale() {

    if(!this.auth.isLoggedIn()){
      if(this.inCart==null)
      this.inCart=new Order();
    }
    else{
      if(this.inCart==null)
        return this.cart();
    }
    return Observable.of(this.inCart);
  }

  public setInCart(inCart: Order) {
    if (this.inCart != null ) {
      if(this.inCart._id != inCart._id)
          inCart.productList = [...inCart.productList, ...this.inCart.productList];
    }
    this.inCart = inCart;
  }

  /**
   * Set the Product, its size and quantity selected by the user.
   * If item already exists, update its quantity.
   * @param size {S/M/L}
   * @param quantity {Quantity}
   * @param product {Product item}
   */
  public addToCart(size: string, quantity: number, product: Product) {
    let item = {
      size: size,
      qty: quantity,
      product: product
    }
    let productList = this.inCart.productList;
    let found = productList.findIndex(prod => (item.product._id == prod.product._id && item.size == prod.size));
    if (found < 0)
      productList.push(item);
    else
      productList[found].qty += quantity;
    return true;
  }

  /**
   * Remove the selected product item from the cart and update details on cart
   * @param item
   */
  public removeFromCart(item: {
    size: string,
    qty: number,
    product: Product
  }) {
    let productList = this.inCart.productList;
    let found = productList.findIndex(prod => (item.product === prod.product
      && item.size == prod.size
      && item.qty == item.qty
    ));
    productList.splice(found, 1);
    if(productList.length<1)
      this.updateCart();
  }

  public product(): Observable<any> {
    let base = this.http.get(`/api/product`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
    return this.processor(base);
  }

  /**
   * Update contents displayed on cart after user authentication
   */
  public updateCart() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    };

    this.http.post(`/api/cart/update`, { "Order": JSON.stringify(this.inCart), "_id": this.auth.getUserDetails()._id }, httpOptions)
      .subscribe(
      res => console.log(res)
      );
  }


  public cart(): Observable<any> {
    let base = this.http.get(`/api/cart`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
    return this.processor(base);
  }

  public cafes(pos): Observable<any> {
    let temp = pos.lat + "," + pos.lng;
    let base = this.http.get(`/api/cafes/${temp}`);
    return this.processor(base);
  }

  /**
   * When user confirms the order, post the data to API and navigate to confirmation page.
   */
  public confirmOrder() {
    this.http.post(`/api/order/confirm`, { "Order": this.inCart, "_id": this.auth.getUserDetails()._id }, this.httpOptions)
      .subscribe(
      res => {console.log(res);
      this.router.navigate(['/confirmation']);
      });
  }

  private processor(base): Observable<any> {
    console.log(base);
    const request = base.pipe(
      map((data: any) => {
        return data;
      })
    );
    return request;
  }
}
