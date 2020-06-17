import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { User } from '../_Models/user';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
appUser = {} as User;
jwtHelper = new JwtHelperService();
baseUrl = environment.baseUrl;
token: string;
navbarName = 'Login';
constructor(private http: HttpClient) { }

login(email, password) {
  return this.http.get(this.baseUrl + '/auth/login?email=' + email + '&password=' + password);
}

register(user: User) {
  return this.http.post(this.baseUrl + '/auth/registration', user);
}

checkUniqueEmail(email) {
  return this.http.get(this.baseUrl + '/auth/emailValidation?email=' + email);
}

getToken() {
this.token = localStorage.getItem('token');
}

loggedIn() {
  const token = localStorage.getItem('token');
  if (!this.jwtHelper.isTokenExpired(token)) {
    this.decodeToken();
    return true;
  }
  return false;
}

decodeToken() {
this.getToken();
const appU = this.jwtHelper.decodeToken(this.token);
this.appUser.Email = appU.email;
this.appUser.Name = appU.unique_name;
const index = this.appUser.Name.indexOf(' ');
this.navbarName = this.appUser.Name.substring(0, index);
}


}
