import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../models/recipes.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-detail',
  standalone: false,

  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  private recipeService = inject(RecipeService);

  private activatedRoute = inject(ActivatedRoute);

  private router = inject(Router);

  dettaglioRicetta: Recipe | undefined;

  ngOnInit(): void {
    this.onGetDetail();
  }

  // SE NELLA ROUTE HO POCHI PARAMETRI USO LO SNAPSHOT
  onGetDetail() {
    const ID = Number(this.activatedRoute.snapshot.queryParamMap.get('_id'));
    if(ID) {
      this.recipeService.getRecipeDetail(ID).subscribe({
        next: (response) => this.dettaglioRicetta = response,
        error: (e) => console.error(e)
      });
    }
  }

  // SE HO PIU' PARAMETRI NELL' URL ALLORA CONVIENE USARE IL PARAMS
  onGetDetail2() {
    this.activatedRoute.params.subscribe((urlParams) => {
      const ID = urlParams['_id'];
      const ID_NUMERICO = Number(ID);
      if(ID_NUMERICO) {
        this.recipeService.getRecipeDetail(ID_NUMERICO).subscribe(res => this.dettaglioRicetta = res);
      }
    })
  }
}
