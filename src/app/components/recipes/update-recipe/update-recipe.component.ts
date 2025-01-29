import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { ToastService } from '../../../services/toast.service';
import { Recipe } from '../../../models/recipes.model';
import { take } from 'rxjs';
import { RECIPES_CATEGORY } from '../../../models/category.const';

@Component({
  selector: 'app-update-recipe',
  standalone: false,

  templateUrl: './update-recipe.component.html',
  styleUrl: './update-recipe.component.scss',
})
export class UpdateRecipeComponent {
  private recipeService = inject(RecipeService);

  private activatedRoute = inject(ActivatedRoute);

  private toastService = inject(ToastService);

  dettaglioRicetta: Recipe;

  categorie = RECIPES_CATEGORY;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    difficulty: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
  });

  constructor() {
    this.onGetDetail();
  }

  onGetDetail() {
    const ID = this.activatedRoute.snapshot.paramMap.get('_id');
    if (ID) {
      this.recipeService.getRicetta(ID).subscribe({
        next: (response) => {
          this.dettaglioRicetta = response;
          this.setValori();
        },
        error: (e) => console.error(e),
      });
    }
  }

  setValori() {
    this.form.controls.title.setValue(this.dettaglioRicetta.title);
    this.form.controls.difficulty.setValue(this.dettaglioRicetta.difficulty);
    this.form.controls.description.setValue(this.dettaglioRicetta.description);
    this.form.controls.category.setValue(this.dettaglioRicetta.category);
  }

  onSubmit() {
    const ricetta: Recipe = {
      _id: this.dettaglioRicetta._id,
      title: this.form.value.title,
      description: this.form.value.description,
      image: this.dettaglioRicetta.image,
      category: this.form.value.category,
      difficulty: this.form.value.difficulty,
      published: this.dettaglioRicetta.published,
    };
    this.recipeService
      .updateRicetta(ricetta)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.toastService.toastSuccesso('Ricetta modificata con successo');
        },
        error: (e) => {
          this.toastService.toastErrore('La ricetta non può essere modificata');
          console.error(e);
        },
      });
  }
}
