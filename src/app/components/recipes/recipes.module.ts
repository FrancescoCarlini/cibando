import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { EditorModule } from 'primeng/editor';

// COMPONENTI
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { DetailComponent } from './detail/detail.component';
import { RecipeCardComponent } from '../shared/recipe-card/recipe-card.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    CreateRecipeComponent,
    DetailComponent,
    RecipeCardComponent,
    UpdateRecipeComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EditorModule,
    PaginatorModule,
  ],
  exports: [RecipeCardComponent],
})
export class RecipesModule {}
