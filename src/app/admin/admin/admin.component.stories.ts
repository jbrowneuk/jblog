import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { storiesOf } from '@storybook/angular';

import { TitleService } from '../../shared/title.service';
import { AdminComponent } from './admin.component';

const mockTitleService = {
  resetTitle: () => {},
  setTitle: () => {}
};

const moduleMetadata: NgModule = {
  imports: [RouterTestingModule, NoopAnimationsModule],
  providers: [{ provide: TitleService, useValue: mockTitleService }]
};

storiesOf('Admin', module).add('Dashboard', () => ({
  component: AdminComponent,
  moduleMetadata,
  props: {}
}));
