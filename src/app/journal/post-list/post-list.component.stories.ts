import { of } from 'rxjs';

import { Component, Input, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/angular';

import { PostService } from '../../services/post.service';
import { InfiniteScrollDirective } from '../../shared/infinite-scroll.directive';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner.component';
import { TitleService } from '../../shared/title.service';
import { PostListComponent } from './post-list.component';

@Component({
  selector: 'jblog-post',
  template: `
    <div class="post emulated-ng-content">Post data</div>
  `,
  styles: ['.post{height:320px;margin-bottom:40px}']
})
class MockPostComponent {
  @Input() data: any;
}

const mockPostService = {
  // post data is mocked out by the mock post component and thus can be anything
  getPostsForPage: (pageNum: number) =>
    of({ posts: [1, 2, 3, 4], page: pageNum, totalPages: 2 }),
  getPost: () => of(1)
};

const mockTitleService = {
  resetTitle: () => {},
  setTitle: () => {}
};

function moduleMetadata(): NgModule {
  return {
    declarations: [
      MockPostComponent,
      LoadSpinnerComponent,
      InfiniteScrollDirective
    ],
    imports: [RouterTestingModule],
    providers: [
      { provide: PostService, useValue: mockPostService },
      { provide: TitleService, useValue: mockTitleService }
    ]
  };
}

const mockRoute = {
  params: [{ id: 1 }]
};

const singlePostModule = moduleMetadata();
singlePostModule.providers.push({
  provide: ActivatedRoute,
  useValue: mockRoute
});

storiesOf('Journal/Post List', module)
  .add('Full view', () => ({
    component: PostListComponent,
    moduleMetadata: moduleMetadata()
  }))
  .add('Single view', () => ({
    component: PostListComponent,
    moduleMetadata: singlePostModule
  }));
