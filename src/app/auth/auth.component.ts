import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthServiceService } from './../_Service/AuthService.service';
import { User } from './../_Models/user';
import { AlertifyService } from './../_Service/alertify.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
formUser = {} as User;
email: string;
password: string;
loginScreen = false;
formHasError: false;
isEmailTaken = false;

  constructor(private authService: AuthServiceService, private router: Router, private alert: AlertifyService) { }

  ngOnInit() {
  }

login() {
  this.authService.login(this.email, this.password).subscribe((response) => {
console.log(response);
localStorage.setItem('token', response as string);
this.authService.getToken();
this.alert.success('Let get back to work!!');

  },
  (error) => {
    console.log(error);
    this.alert.error('Snap!! Login failed');
  },
  () => {
    this.authService.decodeToken();
    this.router.navigate(['/dashboard']);
    this.email = '';
    this.password = '';
  });
}

register() {
  this.authService.register(this.formUser).subscribe((response) => {
    console.log(response);
    this.alert.success('All set, lets login to get started');
    this.loginScreen = !this.loginScreen;
      },
      (error) => {
        console.log(error);
        this.alert.error('Snap!! Registration failed, please try again');
      },
      () => {
        this.formUser = {Name: '', Password: '', Email: '', Confirm: ''};
      });
}

checkUniqueEmail() {
  // if (this.formUser.Email === null) {
  //   return true;
  // }
  console.log(this.formUser);
  this.authService.checkUniqueEmail(this.formUser.Email).subscribe((response) => {
    this.isEmailTaken = response as boolean;

  },
  (error) => {
    console.log(error);
  });
}

}
