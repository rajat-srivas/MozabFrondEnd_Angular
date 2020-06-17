import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './../_Service/AuthService.service';
import { AlertifyService } from './../_Service/alertify.service';
import { Router } from '@angular/router';
import { User } from './../_Models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
profileName: 'Login';
isResponsive = false;
  constructor(private authService: AuthServiceService, private alert: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

logout() {
  localStorage.removeItem('token');
  this.authService.appUser = {} as User;
  this.alert.warning('Logged Out');
  this.authService.navbarName = 'Login';
  this.router.navigate(['']);
}

toggleResponsive(){
this.isResponsive = !this.isResponsive;
}

}
