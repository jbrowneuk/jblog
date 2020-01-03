import { Observable, of } from 'rxjs';

import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { ImageService } from '../../services/image.service';
import { SharedModule } from '../../shared/shared.module';
import { GalleryFormatPipe } from '../gallery-format.pipe';
import { MOCK_IMAGEDATA } from '../mocks/mock-data';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { ImageContainerComponent } from './image-container.component';

function mockFetchImages(
  album: string,
  page: number,
  count: number
): Observable<ImageData[]> {
  const maxNumber = count > 0 && count < 12 ? count : 12;
  const arr = new Array(maxNumber).fill(MOCK_IMAGEDATA);
  return of(arr);
}

const mockImageService = {
  getImagesFromAlbum: mockFetchImages
};

const moduleMetadata: NgModule = {
  imports: [RouterTestingModule, SharedModule],
  declarations: [ThumbnailComponent, GalleryFormatPipe],
  providers: [{ provide: ImageService, useValue: mockImageService }]
};

storiesOf('Gallery', module)
  .addDecorator(withKnobs)
  .add('Image grid', () => ({
    component: ImageContainerComponent,
    moduleMetadata,
    props: {
      albumName: text('albumName', 'album'),
      page: number('page', 1),
      imageCount: number('imageCount', -1)
    }
  }));
