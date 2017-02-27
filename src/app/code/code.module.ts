import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProjectService } from './project.service';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const codeRoutes: Routes = [
  {path: 'code', component: ProjectListComponent},
  {path: 'code/project/:name', component: ProjectDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(codeRoutes),
    SharedModule
  ],
  declarations: [ProjectListComponent, ProjectDetailComponent],
  providers: [ProjectService]
})
export class CodeModule { }
