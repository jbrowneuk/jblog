import { storiesOf } from '@storybook/angular';
import { withKnobs, object } from '@storybook/addon-knobs';
import { NgModule, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { PostData } from '../post-data';

import { PostComponent } from './post.component';

const postData: PostData = {
  postId: 1,
  date: 1553462026,
  title: 'Post title',
  content: 'Post content goes here',
  tags: [],
  slug: 'slug'
};

@Component({
  selector: 'jblog-text',
  template: '<ng-content></ng-content>'
})
class MockTextFormatterComponent {}

const moduleMetadata: NgModule = {
  declarations: [MockTextFormatterComponent, PostComponent],
  imports: [RouterTestingModule]
};

storiesOf('Post', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `<div class="container">
    <jblog-post [data]="data"></jblog-post>
  </div>`,
    props: {
      data: object('data', postData)
    },
    moduleMetadata
  }));
