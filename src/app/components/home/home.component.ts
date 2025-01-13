import { Component } from '@angular/core';
import { Recipe } from '../../models/recipes.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  evidenziato = false;

  ricette: Recipe[] = [];

  constructor(private recipeService: RecipeService) {
    this.recipeService.getRecipes().subscribe({
      next: (response) => {
        this.ricette = response.sort((a, b) => b._id - a._id).slice(0, 4);
      },
      error: (e) => console.error(e),
    });
  }

  onEvidenziazione() {
    this.evidenziato = !this.evidenziato;
  }
}
