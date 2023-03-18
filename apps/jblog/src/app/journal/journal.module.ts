import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostSingleComponent } from './post-single/post-single.component';
import { PostComponent } from './post/post.component';
import { JournalEffects } from './state/journal.effects';
import { journalReducer } from './state/journal.reducer';
import { journalFeatureName } from './state/journal.selectors';

const sectionId = 4;
const journalRoutes: Routes = [
  { path: '', redirectTo: 'page/1', pathMatch: 'full' },
  {
    path: 'page/:page',
    component: PostListComponent,
    data: { sectionId: sectionId }
  },
  {
    path: 'post/:slug',
    component: PostSingleComponent,
    data: { sectionId: sectionId + 0.1 }
  },
  {
    path: 'tag/:tag/page/:page',
    component: PostListComponent,
    data: { sectionId: sectionId }
  },
  {
    path: 'tag/:tag',
    component: PostListComponent,
    data: { sectionId: sectionId }
  },
  { path: '**', redirectTo: 'page/1' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(journalRoutes),
    StoreModule.forFeature(journalFeatureName, journalReducer),
    EffectsModule.forFeature([JournalEffects]),
    SharedModule
  ],
  declarations: [PostComponent, PostListComponent, PostSingleComponent]
})
export class JournalModule {}
