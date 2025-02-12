import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../models/recipes.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-detail',
  standalone: false,

  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  private recipeService = inject(RecipeService);

  private activatedRoute = inject(ActivatedRoute);

  private router = inject(Router);

  dettaglioRicetta: Recipe | undefined;

  percorso = '../../../../assets/images/difficolta-';

  ngOnInit(): void {
    this.onGetDetail();
  }

  // SE NELLA ROUTE HO POCHI PARAMETRI USO LO SNAPSHOT
  onGetDetail() {
    const ID = this.activatedRoute.snapshot.paramMap.get('_id');
    if (ID) {
      this.recipeService.getRicetta(ID).subscribe({
        next: (response) => (this.dettaglioRicetta = response),
        error: (e) => console.error(e),
      });
    }
  }

  // SE HO PIU' PARAMETRI NELL' URL ALLORA CONVIENE USARE IL PARAMS
  onGetDetail2() {
    this.activatedRoute.params.subscribe((urlParams) => {
      const ID = urlParams['_id'];
      if (ID) {
        this.recipeService
          .getRicetta(ID)
          .subscribe((res) => (this.dettaglioRicetta = res));
      }
    });
  }
}
