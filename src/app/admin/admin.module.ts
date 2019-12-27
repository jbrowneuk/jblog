import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../authentication.guard';
import { AdminComponent } from './admin/admin.component';
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
        children: [{ path: '', component: PostListComponent }]
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
  declarations: [AdminComponent, PostListComponent],
  imports: [CommonModule, RouterModule.forChild(adminRoutes)]
})
export class AdminModule {}
