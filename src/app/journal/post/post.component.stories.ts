import { enGB } from 'date-fns/locale';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { SharedModule } from '../../shared/shared.module';
import { DATE_FNS_CONFIG } from '../../variables';
import { PostComponent } from './post.component';

const basePostData = {
  postId: 1,
  title: 'Post title',
  content: `This post content is rendered by the ngx-md module and may not be affected by changing the value in the knobs panel`,
  tags: ['tag-1', 'tag-2'],
  slug: 'slug'
};

const secondsInYear = 31557600;
const recentDate = Math.floor(Date.now() / 1000) - 3600;
const staleDate = Math.floor(Date.now() / 1000) - 3 * secondsInYear;

const currentPostData = Object.assign({ date: recentDate }, basePostData);
const stalePostData = Object.assign({ date: staleDate }, basePostData);
const modifiedPostData = Object.assign(
  { date: recentDate, modified: recentDate },
  basePostData
);

const moduleMetadata: NgModule = {
  declarations: [PostComponent],
  imports: [RouterTestingModule, HttpClientModule, SharedModule],
  providers: [{ provide: DATE_FNS_CONFIG, useValue: { locale: enGB } }]
};

const template = `<div class="container"><jblog-post [data]="data"></jblog-post></div>`;

storiesOf('Journal/Post', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template,
    props: {
      data: object('data', currentPostData)
    },
    moduleMetadata
  }))
  .add('Modified', () => ({
    template,
    props: {
      data: object('data', modifiedPostData)
    },
    moduleMetadata
  }))
  .add('Outdated/Stale', () => ({
    template,
    props: {
      data: object('data', stalePostData)
    },
    moduleMetadata
  }));
