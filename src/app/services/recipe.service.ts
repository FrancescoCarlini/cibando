import { Injectable } from '@angular/core';
import { RECIPES } from '../mocks/recipes.mock';
import { Observable, of } from 'rxjs';
import { Recipe } from '../models/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  getRecipes(): Observable<Recipe[]> {
    return of(RECIPES);
  }

  getRecipeDetail(id: number): Observable<Recipe> {
    return of(RECIPES.find((ricetta: Recipe) => ricetta._id === id));
  }
}
