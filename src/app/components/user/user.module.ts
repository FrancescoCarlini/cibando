import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [LoginComponent, ProfileComponent, RegistrationComponent, UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
