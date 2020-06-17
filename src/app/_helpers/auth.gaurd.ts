import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../_Service/AuthService.service';
import { AlertifyService } from './../_Service/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router, private alertify: AlertifyService) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    console.log('here');

  }
}
