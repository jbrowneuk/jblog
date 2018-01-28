import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeComponent } from './recipe/recipe.component';

const sectionId = 3.3;
const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: RecipesListComponent, data: { sectionId: sectionId } },
  { path: 'recipe', component: RecipeComponent, data: { sectionId: sectionId } },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [RecipesListComponent, RecipeComponent]
})
export class RecipesModule { }
