import { of } from 'rxjs';

import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { storiesOf } from '@storybook/angular';

import { ImageService } from '../../services/image.service';
import { TitleService } from '../../shared/title.service';
import { MOCK_IMAGEDATA } from '../mocks/mock-data';
import { ImageComponent } from './image.component';

const mockActivatedRoute = {
  params: of({ id: 1 })
};

const mockTitle = {
  setTitle: () => {}
};

const mockImageService = {
  getImageInfo: () => of(MOCK_IMAGEDATA)
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
