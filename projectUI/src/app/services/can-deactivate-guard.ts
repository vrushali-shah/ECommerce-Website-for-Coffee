import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {
    CanDeactivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { CartComponent } from '../cart/cart.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CartComponent> {

    canDeactivate(
        component: CartComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        if (component.saved) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // observable which resolves to true or false when the user decides
        return this.confirm('Discard changes?');
    }
    confirm(message?: string): Observable<boolean> {
        const confirmation = window.confirm(message || 'Is it OK?');
        return Observable.of(confirmation);
    };
}