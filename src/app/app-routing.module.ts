import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferitesComponent } from './components/preferites/preferites.component';
import { loggedInGuard } from './logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/shared/shared.module').then(
        (module) => module.SharedModule
      ),
  },
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
  {
    path: 'preferiti',
    component: PreferitesComponent,
    canActivate: [loggedInGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
