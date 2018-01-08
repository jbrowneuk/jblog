import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeComponent } from './recipe/recipe.component';

const journalRoutes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesListComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: '**', redirectTo: 'recipes' }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RecipesListComponent, RecipeComponent]
})
export class RecipesModule { }
