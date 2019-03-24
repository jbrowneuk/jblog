import { storiesOf } from '@storybook/angular';
import { withKnobs, object } from '@storybook/addon-knobs';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { PostData } from '../post-data';
import { TextParsingService } from '../../shared/text-parsing.service';

import { PostComponent } from './post.component';

const mockTextParser = {
  parse: (value: any) => value
};

const postData: PostData = {
  postId: 1,
  date: 1553462026,
  title: 'Post title',
  content: 'Post content goes here',
  tags: [],
  slug: 'slug'
};

const moduleMetadata: NgModule = {
  declarations: [PostComponent],
  imports: [RouterTestingModule],
  providers: [{ provide: TextParsingService, useValue: mockTextParser }]
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
