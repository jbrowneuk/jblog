import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectService } from './project.service';
import { ArchivedProjectFilterPipe } from './projects-container/archive.pipe';
import { ProjectsContainerComponent } from './projects-container/projects-container.component';

const sectionId = 3.1;
const codeRoutes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    pathMatch: 'full',
    data: { sectionId: sectionId }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(codeRoutes), SharedModule],
  declarations: [
    ProjectListComponent,
    ProjectsContainerComponent,
    ArchivedProjectFilterPipe
  ],
  exports: [ProjectsContainerComponent],
  providers: [ProjectService]
})
export class CodeModule {}
