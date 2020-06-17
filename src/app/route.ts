import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DshboardComponent } from './dshboard/dshboard.component';
import { AuthGuard } from './_helpers/auth.gaurd';
export const appRoutes: Routes = [
    // {path: '', component: AuthComponent,  runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},
    // {path: 'login', component: AuthComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},
    {path: '', component: AuthComponent},
    {path: 'login', component: AuthComponent},
    {path: 'dashboard', component: DshboardComponent,  runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
