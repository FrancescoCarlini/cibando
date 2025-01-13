import { Component } from '@angular/core';
import { Recipe } from '../../../models/recipes.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  standalone: false,

  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent {
  ricette: Recipe[] = [];

  titoloRicevuto: string;

  constructor(private recipeService: RecipeService) {
    this.recipeService.getRecipes().subscribe({
      next: (response) => {
        this.ricette = response;
      },
      error: (e) => console.error(e),
    });
  }

  riceviTitolo(event: any) {
    this.titoloRicevuto = event;
  }
}
