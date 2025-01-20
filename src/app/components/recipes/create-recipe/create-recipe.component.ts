import { Component, inject } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../models/recipes.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  standalone: false,

  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  private recipeService = inject(RecipeService);

  private router = inject(Router);

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', []),
    difficulty: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
  });

  onSubmit() {
    const ricetta: Recipe = {
      _id: '',
      title: this.form.value.title,
      description: this.form.value.description,
      image: this.form.value.image,
      difficulty: Number(this.form.value.difficulty),
      date: new Date().toLocaleDateString(),
      published: true,
    };
    this.recipeService.addRicetta(ricetta).subscribe({
      next: () => this.router.navigateByUrl('/ricette'),
      error: (e) => console.error(e),
    });
  }
}
