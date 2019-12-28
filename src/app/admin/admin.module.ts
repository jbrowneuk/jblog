import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../authentication.guard';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostListComponent } from './post-list/post-list.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'posts',
        canActivateChild: [AuthenticationGuard],
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
    FormsModule,
    SharedModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule {}
