import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { GalleryFormatPipe } from '../gallery-format.pipe';
import { MOCK_IMAGEDATA } from '../mocks/mock-data';
import { ThumbnailComponent } from './thumbnail.component';

const moduleMetadata: NgModule = {
  declarations: [GalleryFormatPipe, ThumbnailComponent],
  imports: [RouterTestingModule]
};

storiesOf('Gallery', module)
  .addDecorator(withKnobs)
  .add('Thumbnail', () => ({
    template: `<div style="margin:0;padding:10px;">
  <div class="grid">
    <jblog-thumbnail [data]="data" style="grid-column: span 3"></jblog-thumbnail>
    <jblog-thumbnail [data]="data" style="grid-column: span 3"></jblog-thumbnail>
  </div>
  </div>`,
    props: {
      data: object('data', MOCK_IMAGEDATA)
    },
    moduleMetadata
  }));
