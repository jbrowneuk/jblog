import { Component, NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { PostData } from '../../model/post-data';
import { PostComponent } from './post.component';

const postData: PostData = {
  postId: 1,
  date: 1553462026,
  modified: null,
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

storiesOf('Journal', module)
  .addDecorator(withKnobs)
  .add('Post', () => ({
    template: `<div class="container">
    <jblog-post [data]="data"></jblog-post>
  </div>`,
    props: {
      data: object('data', postData)
    },
    moduleMetadata
  }));
