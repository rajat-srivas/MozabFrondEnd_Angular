import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../_Models/user';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
appUser: User;
baseUrl = environment.baseUrl;
constructor(private http: HttpClient) { }

}
