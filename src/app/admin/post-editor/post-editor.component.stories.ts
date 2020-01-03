import { of } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { storiesOf } from '@storybook/angular';

import { PostService } from '../../services/post.service';
import { SharedModule } from '../../shared/shared.module';
import { PostEditorComponent } from './post-editor.component';

const mockPost = {
  postId: 1,
  date: Math.floor(Date.now() / 1000),
  modified: null,
  title: 'My awesome post',
  content: 'This is the post content',
  tags: 'tag-1, tag-2',
  slug: 'my-awesome-post'
};

const mockPostService = {
  getPost: () => of(mockPost)
};

const mockParams = {
  get: () => mockPost.postId
};

const mockActivatedRoute = {
  paramMap: of(mockParams)
};

// HttpClientModule is used by ngx-md
const moduleMetadata: NgModule = {
  imports: [RouterTestingModule, HttpClientModule, SharedModule],
  providers: [
    { provide: ActivatedRoute, useValue: mockActivatedRoute },
    { provide: PostService, useValue: mockPostService }
  ]
};

storiesOf('Admin', module).add('Post editor', () => ({
  component: PostEditorComponent,
  moduleMetadata: moduleMetadata
}));
