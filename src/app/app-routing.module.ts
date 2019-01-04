import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  { path: 'art', loadChildren: 'app/gallery/gallery.module#GalleryModule' },
  { path: 'journal', loadChildren: 'app/journal/journal.module#JournalModule' },
  { path: 'projects/code', loadChildren: 'app/code/code.module#CodeModule' },
  { path: 'code', redirectTo: 'projects/code' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
