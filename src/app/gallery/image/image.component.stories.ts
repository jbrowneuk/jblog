import { of } from 'rxjs';

import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { storiesOf } from '@storybook/angular';

import { ImageService } from '../../services/image.service';
import { TitleService } from '../../shared/title.service';
import { ImageComponent } from './image.component';

const mockImageData = {
  id: 1,
  title: 'Image title',
  date: 1553462026,
  description: 'Description',
  thumbnail: '//placehold.it/320x200',
  src: '//placehold.it/1024x768',
  containingAlbums: [{ name: 'name', title: 'Gallery title' }],
  featured: false
};

const mockActivatedRoute = {
  params: of({ id: 1 })
};

const mockTitle = {
  setTitle: () => {}
};

const mockImageService = {
  getImageInfo: () => of(mockImageData)
};

@Component({
  selector: 'jblog-text',
  template: '<ng-content></ng-content>'
})
class MockTextComponent {}

@Component({
  selector: 'jblog-load-spinner',
  template: ''
})
class MockLoadSpinnerComponent {}

const moduleMetadata: NgModule = {
  declarations: [MockTextComponent, MockLoadSpinnerComponent],
  imports: [RouterTestingModule],
  providers: [
    { provide: ActivatedRoute, useValue: mockActivatedRoute },
    { provide: TitleService, useValue: mockTitle },
    { provide: ImageService, useValue: mockImageService }
  ]
};

storiesOf('Gallery', module).add('Image View', () => ({
  component: ImageComponent,
  moduleMetadata,
  props: {}
}));
