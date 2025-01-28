import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { HeaderComponent } from './header/header.component';
import { SharedRoutingModule } from './shared-routing.module';
import { RecipesModule } from '../recipes/recipes.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PreferitesComponent } from '../preferites/preferites.component';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    ContactsComponent,
    HeaderComponent,
    PreferitesComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ButtonModule,
    HttpClientModule,
    RecipesModule,
  ],
  exports: [HeaderComponent],
})
export class SharedModule {}
