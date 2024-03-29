import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './authentication.guard';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'art',
    loadChildren: () =>
      import('./gallery/gallery.module').then(m => m.GalleryModule)
  },
  {
    path: 'journal',
    loadChildren: () =>
      import('./journal/journal.module').then(m => m.JournalModule)
  },
  {
    path: 'projects/code',
    loadChildren: () => import('./code/code.module').then(m => m.CodeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [
      () => inject(AuthenticationGuard).canLoad(inject(Router).routerState)
    ]
  },
  { path: 'code', redirectTo: 'projects/code' },
  { path: '**', component: ErrorComponent, data: { sectionId: 0 } }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
