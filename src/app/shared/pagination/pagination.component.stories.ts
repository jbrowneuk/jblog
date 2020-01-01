import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { array, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { PaginationComponent } from './pagination.component';

const moduleMetadata: NgModule = {
  declarations: [PaginationComponent],
  imports: [HttpClientModule, RouterTestingModule]
};

storiesOf('Shared', module)
  .addDecorator(withKnobs)
  .add('Pagination', () => ({
    template: `<jblog-pagination
    [urlComponents]="urlComponents"
    [currentPage]="currentPage"
    [totalPages]="totalPages"
  ></jblog-pagination>`,
    moduleMetadata,
    props: {
      urlComponents: array('urlComponents', ['zone']),
      currentPage: number('currentPage', 3),
      totalPages: number('totalPages', 5)
    }
  }));
