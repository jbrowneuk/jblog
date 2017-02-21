import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const journalRoutes: Routes = [
  {path: 'journal', component: null }
];

@NgModule({
  imports: [
    CommonModule
    RouterModule.forChild(journalRoutes)
  ],
  declarations: []
})
export class JournalModule { }
