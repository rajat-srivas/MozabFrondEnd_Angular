import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DshboardComponent } from './dshboard/dshboard.component';
import { CardComponent } from './card/card.component';
import { AddCardComponent } from './add-card/add-card.component';
import { CardItemComponent } from './card-item/card-item.component';
import { BoardServiceService } from './_Service/BoardService.service';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthComponent } from './auth/auth.component';
import { ValidateEqualDirective } from './_helpers/ValidateEqual.directive';
import { AlertifyService } from './_Service/alertify.service';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
export function tokenGetter() {
   return localStorage.getItem('token');
}


@NgModule({
   declarations: [
      AppComponent,
      DshboardComponent,
      CardComponent,
      AddCardComponent,
      CardItemComponent,
      ConfirmModalComponent,
      NavbarComponent,
      AuthComponent,
      ValidateEqualDirective
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      ModalModule.forRoot(),
      JwtModule.forRoot({
         config: {
            // tslint:disable-next-line: object-literal-shorthand
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:44321'],
            blacklistedRoutes: ['localhost:44321/api/auth']
         }
      }),
    ],
   providers: [
      BoardServiceService,
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      CardComponent,
      ConfirmModalComponent
   ]
})
export class AppModule { }
