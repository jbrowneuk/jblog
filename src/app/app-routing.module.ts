import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
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
  { path: 'code', redirectTo: 'projects/code' },
  { path: '**', component: ErrorComponent, data: { sectionId: 0 } }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
