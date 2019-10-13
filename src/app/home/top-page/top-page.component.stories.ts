import { storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleService } from '../../shared/title.service';
import { TopPageComponent } from './top-page.component';

const mockTitleService = {
  resetTitle: () => {},
  setTitle: () => {}
};

const moduleMetadata: NgModule = {
  imports: [BrowserAnimationsModule],
  providers: [{ provide: TitleService, useValue: mockTitleService }]
};

storiesOf('Top Page', module).add('Default', () => ({
  component: TopPageComponent,
  moduleMetadata
}));
