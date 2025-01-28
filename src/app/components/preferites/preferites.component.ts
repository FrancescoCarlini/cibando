import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { User } from '../../models/user.model';
import { Recipe } from '../../models/recipes.model';
import { take } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-preferites',
  standalone: false,

  templateUrl: './preferites.component.html',
  styleUrl: './preferites.component.scss',
})
export class PreferitesComponent {
  ricette: Recipe[];

  preferiti = [];

  user: User;

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private toastService: ToastService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.preferiti = this.user?.preferite?.length ? this.user.preferite : [];
    this.recipeService
      .getRicette()
      .pipe(take(1))
      .subscribe({
        next: (res) => (this.ricette = res),
        error: (e) => console.error(e),
      });
  }

  aggiornaPreferiti(event) {
    if (event.isPreferite) {
      this.preferiti.push(event.idRicetta);
    } else {
      this.preferiti = this.preferiti.filter(
        (idRicetta) => idRicetta !== event.idRicetta
      );
    }
  }

  confermaPreferiti() {
    this.user.preferite = this.preferiti;
    this.userService
      .updateUser(this.user)
      .pipe(take(1))
      .subscribe({
        next: (res) =>
          this.toastService.toastSuccesso(
            'I tuoi preferiti sono stati modificati con successo'
          ),
        error: (e) => this.toastService.toastErrore('Qualcosa è andato storto'),
      });
  }
}
