import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'jblog-pdc',
  template: '<div class="micro-hero"></div><p>Temporary!</p>'
})
class ProjectDisambiguationComponent {}

const sectionId = 3.0;
const routes: Routes = [
  { path: 'projects', component: ProjectDisambiguationComponent, pathMatch: 'full', data: { sectionId: sectionId } },
  { path: 'projects/code', loadChildren: '../code/code.module#CodeModule' },
  { path: 'projects/recipes', loadChildren: '../recipes/recipes.module#RecipesModule' },
  { path: 'code', redirectTo: 'projects/code' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProjectDisambiguationComponent]
})
export class ProjectsModule { }
