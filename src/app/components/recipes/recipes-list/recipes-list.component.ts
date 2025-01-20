import { Component } from '@angular/core';
import { Recipe } from '../../../models/recipes.model';
import { RecipeService } from '../../../services/recipe.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-recipes-list',
  standalone: false,

  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent {
  ricette: Recipe[] = [];

  titoloRicevuto: string;

  first: number = 0;

  rows: number = 5;

  page = 1;
  size = 4;

  constructor(private recipeService: RecipeService) {
    this.recipeService.getRicette().subscribe({
      next: (response) => {
        this.ricette = response;
      },
      error: (e) => console.error(e),
    });
  }

  riceviTitolo(event: any) {
    this.titoloRicevuto = event;
  }

  onPageChange(event) {
    event.page = event.page + 1;
    this.page = event.page;
    this.size = event.rows;
  }
}
