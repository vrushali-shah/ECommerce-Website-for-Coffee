import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MenuComponent } from './menu/menu.component';
import { StoresComponent } from './stores/stores.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import {MainService} from './services/main.service';
import {CanDeactivateGuard} from './services/can-deactivate-guard';
import {MenuResolver} from './services/resolver';
import {CartResolver} from './services/cart-resolver';
import {ProfileResolver} from './services/profile-resolver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DecisionwheelComponent } from './decisionwheel/decisionwheel.component';
import { DetailComponent } from './detail/detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PagenotfoundComponent,
    AboutusComponent,
    MenuComponent,
    StoresComponent,
    CartComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    DecisionwheelComponent,
    DetailComponent,
    CheckoutComponent,
    PaymentComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2CarouselamosModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    MainService,
    CanDeactivateGuard,
    MenuResolver,
    CartResolver,
    ProfileResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
