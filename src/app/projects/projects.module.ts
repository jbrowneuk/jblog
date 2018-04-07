import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { DisambiguationPageComponent } from './disambiguation-page/disambiguation-page.component';
import { environment } from '../../environments/environment.prod';

const sectionId = 3.0;

let routes: Routes = [];
if (environment.featureToggles.includes('newProjectStructure')) {
  routes.push(...[
    { path: 'projects', component: DisambiguationPageComponent, pathMatch: 'full', data: { sectionId: sectionId } },
    { path: 'projects/code', loadChildren: '../code/code.module#CodeModule' },
    { path: 'projects/recipes', loadChildren: '../recipes/recipes.module#RecipesModule' },
    { path: 'code', redirectTo: 'projects/code' }
  ]);
} else {
  routes.push(...[
    { path: 'code', loadChildren: '../code/code.module#CodeModule' },
    { path: 'projects', redirectTo: 'code' }
  ]);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [DisambiguationPageComponent]
})
export class ProjectsModule { }
