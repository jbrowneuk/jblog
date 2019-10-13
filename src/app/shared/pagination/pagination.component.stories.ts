import { storiesOf } from '@storybook/angular';
import { withKnobs, number, array } from '@storybook/addon-knobs';
import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

const moduleMetadata: NgModule = {
  declarations: [PaginationComponent],
  imports: [HttpClientModule, RouterTestingModule]
};

storiesOf('Pagination', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
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
