import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { NgModule, Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PostListComponent } from './post-list.component';
import { InfiniteScrollDirective } from '../../shared/infinite-scroll.directive';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner.component';
import { PostService } from '../post.service';
import { TitleService } from '../../shared/title.service';
import { of } from 'rxjs';

@Component({
  selector: 'jblog-post',
  template: `
    <div class="post emulated-ng-content">Post data</div>
  `,
  styles: ['.post{margin-bottom:40px}']
})
class MockPostComponent {
  @Input() data: any;
}

const mockPostService = {
  // post data is mocked out by the mock post component and thus can be anything
  getPostsForPage: () => of({ posts: [1, 2, 3, 4], totalPages: 1 })
};

const mockTitleService = {
  resetTitle: () => {},
  setTitle: () => {}
};

const moduleMetadata: NgModule = {
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

storiesOf('Post List', module).add('Default', () => ({
  component: PostListComponent,
  moduleMetadata,
  props: {
    scrollCallback: action('Scroll limit reached')
  }
}));
