import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { DetailComponent } from './components/recipes/detail/detail.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CreateRecipeComponent } from './components/recipes/create-recipe/create-recipe.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'ricette',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipesListComponent, pathMatch: 'full' },
      { path: 'dettaglio/:_id', component: DetailComponent },
      { path: 'dettaglio/:title/:_id', component: DetailComponent },
      { path: 'aggiungi', component: CreateRecipeComponent },
    ],
  },
  { path: 'contatti', component: ContactsComponent },
  { path: 'registrazione', component: RegistrationComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
