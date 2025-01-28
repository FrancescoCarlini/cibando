import { Component, inject } from '@angular/core';
import { Recipe } from '../../../models/recipes.model';
import { RecipeService } from '../../../services/recipe.service';
import { map, Observable, take } from 'rxjs';

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
  private recipeService = inject(RecipeService);
  ricette: Recipe[] = [];

  titoloRicevuto: string;

  first: number = 0;

  rows: number = 5;

  page = 1;
  size = 4;

  totaleRicette: Recipe[];

  recipes$ = this.recipeService.getRicette().pipe(
    map((response) =>
      response.filter((ricetteFiltrate) => ricetteFiltrate.difficulty < 3)
    ),
    map((res) => (this.totaleRicette = res))
  );

  constructor() {
    // this.getRecipes();
    const page = localStorage.getItem('page');
    const size = localStorage.getItem('size');
    if (size && page) {
      this.size = Number(size);
      this.page = Number(page);
    } else {
      localStorage.setItem('size', '' + this.size);
      localStorage.setItem('page', '' + this.page);
    }
  }

  getRecipes() {
    this.recipeService
      .getRicette()
      .pipe(take(1))
      .subscribe({
        next: (response) => (this.ricette = response),
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
    localStorage.setItem('size', '' + this.size);
    localStorage.setItem('page', '' + this.page);
  }
}
