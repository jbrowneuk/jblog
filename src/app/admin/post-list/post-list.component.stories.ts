import { of } from 'rxjs';

import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { storiesOf } from '@storybook/angular';

import { PostService } from '../../services/post.service';
import { PostListComponent } from './post-list.component';

const mockPost = {
  postId: 1,
  date: Math.floor(Date.now() / 1000),
  modified: null,
  title: 'My awesome post',
  content: '',
  tags: '',
  slug: 'my-awesome-post'
};

const mockPostService = {
  getPostsForPage: (pageNum: number) =>
    of({ posts: [mockPost, mockPost, mockPost], page: pageNum, totalPages: 2 })
};

function moduleMetadata(): NgModule {
  return {
    imports: [RouterTestingModule],
    providers: [{ provide: PostService, useValue: mockPostService }]
  };
}

storiesOf('Admin', module).add('Post list', () => ({
  component: PostListComponent,
  moduleMetadata: moduleMetadata()
}));
