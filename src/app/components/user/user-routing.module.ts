import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { loggedInGuard } from '../../logged-in.guard';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      // { path: '', component: UserComponent, pathMatch: 'full' },
      { path: '', component: LoginComponent },
      { path: 'registrazione', component: RegistrationComponent },
      {
        path: 'profilo',
        component: ProfileComponent,
        canActivate: [loggedInGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
