import { Component, inject } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../models/recipes.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { RECIPES_CATEGORY } from '../../../models/category.const';

@Component({
  selector: 'app-create-recipe',
  standalone: false,

  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  private recipeService = inject(RecipeService);

  private router = inject(Router);

  private toastService = inject(ToastService);

  categorie = RECIPES_CATEGORY;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', []),
    category: new FormControl('', [Validators.required]),
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
      category: this.form.value.category,
      date: new Date().toLocaleDateString(),
      published: true,
    };
    this.recipeService.addRicetta(ricetta).subscribe({
      next: () => {
        this.toastService.toastSuccesso('Ricetta creata con successo');
        this.router.navigateByUrl('/ricette');
      },
      error: (e) => {
        this.toastService.toastErrore('Qualcosa è andato storto');
        console.error(e);
      },
    });
  }
}
