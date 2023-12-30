import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../authentication.guard';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostListComponent } from './post-list/post-list.component';

const sectionId = 5;
const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [
      () => inject(AuthenticationGuard).canActivate(inject(Router).routerState)
    ],
    data: { sectionId: sectionId },
    children: [
      {
        path: 'posts',
        canActivateChild: [
          () =>
            inject(AuthenticationGuard).canActivateChild(
              inject(Router).routerState
            )
        ],
        children: [
          { path: 'create', component: PostEditorComponent },
          { path: 'edit/:id', component: PostEditorComponent },
          { path: '', component: PostListComponent }
        ]
      },
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [AdminComponent, PostListComponent, PostEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule {}
