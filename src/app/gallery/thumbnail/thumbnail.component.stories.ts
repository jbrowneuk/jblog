import { storiesOf } from '@storybook/angular';
import { withKnobs, object } from '@storybook/addon-knobs';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ImageInfo } from '../image-info';
import { GalleryFormatPipe } from '../gallery-format.pipe';

import { ThumbnailComponent } from './thumbnail.component';

const imageData: ImageInfo = {
  id: 1,
  title: 'Image title',
  date: 1553462026,
  description: 'Description',
  thumbnail: '//placehold.it/320x200',
  src: '//placehold.it/1024x768',
  containingAlbums: [{ name: 'name', title: 'Gallery title' }],
  featured: false
};

const moduleMetadata: NgModule = {
  declarations: [GalleryFormatPipe, ThumbnailComponent],
  imports: [RouterTestingModule]
};

storiesOf('Thumbnail', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `<div style="margin:0;padding:10px;">
  <div class="grid">
    <jblog-thumbnail [data]="data" style="grid-column: span 3"></jblog-thumbnail>
    <jblog-thumbnail [data]="data" style="grid-column: span 3"></jblog-thumbnail>
  </div>
  </div>`,
    props: {
      data: object('data', imageData)
    },
    moduleMetadata
  }));