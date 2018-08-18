import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  SigninForm: FormGroup;
  msg: string;
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {
    this.msg = "";
  }

  /**
   * Authenticate user credentials.
   * Navigate to profile page when successful else display message on the browser.
   */
  login() {
    this.auth.login(this.credentials).subscribe((data) => {
      if (data.message)
        this.msg ="Invalid Username and/or password";
      else
        this.router.navigateByUrl('/profile');
    }, (err) => {
      this.msg = "Invalid Username or password!";
      //console.log(err);
      });
    this.SigninForm.reset();
  }

  /**
   * Validations for user inputs
   */
  ngOnInit() {
    this.SigninForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
      ]),
    });
  }
}
