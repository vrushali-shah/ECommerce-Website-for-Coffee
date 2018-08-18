import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { UserDetails } from '../models/UserDetails';
import {MainService} from './main.service';

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }
  /**
   * Save User's JWT token to localstorage
   * @param token
   */
  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }
  /**
   * Fetch user token from localstorage
   */
  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }
  /**
   * Fetch User Details fro payload as JSON object
   */
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  /**
   * Check if user is already logged in
   */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
        base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

   // console.log(base);
    const request = base.pipe(
      map((data: any) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  /**
   * Post Newly registered user details to API
   * @param user
   */
  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  /**
   * Post user loginn details to API
   * @param user
   */
  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  /**
   * Obtain user profile from API after successfull login
   */
  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  /**
   * Remove user's token from localstorage
   */
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}
