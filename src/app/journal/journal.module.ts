import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';

import { PostService } from './post.service';

const journalRoutes: Routes = [
  {path: 'journal', component: PostListComponent },
  {path: 'journal/post/:id', component: PostComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(journalRoutes)
  ],
  declarations: [PostComponent, PostListComponent],
  providers: [PostService]
})
export class JournalModule { }
