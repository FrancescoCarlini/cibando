import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactsComponent } from './components/contacts/contacts.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contatti', component: ContactsComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./components/user/user.module').then(
        (module) => module.UserModule
      ),
  },
  {
    path: 'ricette',
    loadChildren: () =>
      import('./components/recipes/recipes.module').then(
        (module) => module.RecipesModule
      ),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
