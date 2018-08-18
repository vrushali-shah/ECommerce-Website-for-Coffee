import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router, Resolve, RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import { Product } from '../models/product';
import { MainService } from '../services/main.service';

@Injectable()
export class CartResolver implements Resolve<any> {
    constructor(private main: MainService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
       let search = route.paramMap.get('search');
       let index = route.paramMap.get('index');
        
        return this.main.getInCartObservale().take(1).map(result => {
            if (result) {
                this.main.setInCart(result);
                return result;
            } else { // id not found
                this.router.navigate(['/home']);
                return null;
            }
        });
    }
}