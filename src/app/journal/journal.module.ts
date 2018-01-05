import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';

import { PostService } from './post.service';

const journalRoutes: Routes = [
  { path: '', redirectTo: 'page/1', pathMatch: 'full' },
  { path: 'page/:page', component: PostListComponent },
  { path: 'post/:id', component: PostListComponent },
  { path: 'tag/:tag/page/:page', component: PostListComponent },
  { path: 'tag/:tag', component: PostListComponent },
  { path: '**', redirectTo: 'page/1' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(journalRoutes),
    SharedModule
  ],
  declarations: [PostComponent, PostListComponent],
  providers: [PostService]
})
export class JournalModule { }
