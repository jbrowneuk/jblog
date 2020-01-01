import { NgModule } from '@angular/core';
import { storiesOf } from '@storybook/angular';

import { TitleService } from '../../shared/title.service';
import { AboutComponent } from './about.component';

const mockTitleService = {
  resetTitle: () => {},
  setTitle: () => {}
};

const moduleMetadata: NgModule = {
  providers: [{ provide: TitleService, useValue: mockTitleService }]
};

storiesOf('Home', module).add('About', () => ({
  component: AboutComponent,
  moduleMetadata
}));
