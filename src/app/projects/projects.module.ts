import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { DisambiguationPageComponent } from './disambiguation-page/disambiguation-page.component';

const sectionId = 3.0;
const routes: Routes = [
  { path: 'projects', component: DisambiguationPageComponent, pathMatch: 'full', data: { sectionId: sectionId } },
  { path: 'projects/code', loadChildren: '../code/code.module#CodeModule' },
  { path: 'projects/recipes', loadChildren: '../recipes/recipes.module#RecipesModule' },
  { path: 'code', redirectTo: 'projects/code' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [DisambiguationPageComponent]
})
export class ProjectsModule { }
