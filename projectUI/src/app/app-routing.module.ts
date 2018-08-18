import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {StoresComponent} from './stores/stores.component';
import {MenuComponent} from './menu/menu.component';
import {CartComponent} from './cart/cart.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DetailComponent } from './detail/detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import {MenuResolver} from './services/resolver';
import {CartResolver} from './services/cart-resolver';
import {CanDeactivateGuard} from './services/can-deactivate-guard';
import { ProfileResolver } from './services/profile-resolver';

import {DecisionwheelComponent} from './decisionwheel/decisionwheel.component';
const appRoutes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'menu',component: MenuComponent,resolve: {
    main: MenuResolver,cart:CartResolver
  } },
  { path: 'about',component: AboutusComponent },
  { path: 'cart',component: CartComponent, canDeactivate: [CanDeactivateGuard],resolve: {
    main: CartResolver
  } },
  { path: 'findstores', component: StoresComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detail/:index', component: DetailComponent,resolve: {
    main: MenuResolver,cart:CartResolver
  } },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'wheel', component: DecisionwheelComponent },
  { path: 'confirmation', component: ConfirmationComponent,resolve: {
    main: ProfileResolver
  } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService],resolve: {
    main: ProfileResolver
  } },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
      { enableTracing: false } )],
  exports: [
    RouterModule
    ],
    providers:[
      MenuResolver
    ]
})
export class AppRoutingModule { }
