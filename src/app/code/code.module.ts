import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProjectService } from './project.service';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsContainerComponent } from './projects-container/projects-container.component';

const sectionId = 3.1;
const codeRoutes: Routes = [
  { path: '', component: ProjectListComponent, pathMatch: 'full', data: { sectionId: sectionId } },
  { path: 'project/:name', component: ProjectDetailComponent, data: { sectionId: sectionId } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(codeRoutes),
    SharedModule
  ],
  declarations: [ProjectListComponent, ProjectDetailComponent, ProjectsContainerComponent],
  exports: [ProjectsContainerComponent],
  providers: [ProjectService]
})
export class CodeModule { }
