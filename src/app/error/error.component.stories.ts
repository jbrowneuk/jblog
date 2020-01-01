import { NgModule } from '@angular/core';
import { storiesOf } from '@storybook/angular';

import { TitleService } from '../shared/title.service';
import { ErrorComponent } from './error.component';

const mockTitle = {
  resetTitle: () => {}
};

const moduleMetadata: NgModule = {
  providers: [{ provide: TitleService, useValue: mockTitle }]
};

storiesOf('Core', module).add('Error Page', () => ({
  component: ErrorComponent,
  moduleMetadata
}));
