import { storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { TitleService } from '../../shared/title.service';
import { LicensesComponent } from './licenses.component';

const mockTitleService = {
  resetTitle: () => {},
  setTitle: () => {}
};

const moduleMetadata: NgModule = {
  providers: [{ provide: TitleService, useValue: mockTitleService }]
};

storiesOf('Licenses Page', module).add('Default', () => ({
  component: LicensesComponent,
  moduleMetadata
}));
