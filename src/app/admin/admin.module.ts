import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: []
  }
];

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule.forChild(adminRoutes)]
})
export class AdminModule {}
