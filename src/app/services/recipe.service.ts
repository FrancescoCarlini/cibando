import { Injectable } from '@angular/core';
import { RECIPES } from '../mocks/recipes.mock';
import { Observable, of } from 'rxjs';
import { Recipe } from '../models/recipes.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  API_BASE_URL = '/api/recipes';

  constructor(private http: HttpClient) {}

  getRicette(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.API_BASE_URL}/`);
  }

  getRicetta(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.API_BASE_URL}/${id}`);
  }

  addRicetta(ricetta: Recipe): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}`, ricetta);
  }

  // CHIAMATE MOCK
  getRecipes(): Observable<Recipe[]> {
    return of(RECIPES);
  }

  getRecipeDetail(id: number): Observable<Recipe> {
    return of(RECIPES.find((ricetta: Recipe) => ricetta._id === id));
  }
}
