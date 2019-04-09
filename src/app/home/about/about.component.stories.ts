import { storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { TitleService } from '../../shared/title.service';
import { AboutComponent } from './about.component';

const mockTitleService = {
  resetTitle: () => {},
  setTitle: () => {}
};

const moduleMetadata: NgModule = {
  providers: [{ provide: TitleService, useValue: mockTitleService }]
};

storiesOf('About Page', module).add('Default', () => ({
  component: AboutComponent,
  moduleMetadata
}));
