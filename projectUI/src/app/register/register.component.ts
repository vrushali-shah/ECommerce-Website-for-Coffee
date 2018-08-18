import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  RegisterForm: FormGroup;
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  /**
   * On successfull authenticatication of a newly registered user, navigate to Profile page.
   */
  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  /**
   * Validate user inputs
   */
  ngOnInit() {
    this.RegisterForm = new FormGroup({
      fullName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Za-z][A-Za-z0-9]*$')
      ]),
      emailRegister: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
      ]),
      passwordRegister: new FormControl(null, Validators.required)
    });
  }
}
