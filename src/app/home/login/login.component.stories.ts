import { of, throwError } from 'rxjs';

import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { storiesOf } from '@storybook/angular';

import { UserService } from '../../services/user.service';
import { LoginComponent } from './login.component';

const mockUserService = {
  initialiseSession: () => throwError(new Error('mock'))
};

const mockRouter = {
  navigate: () => {}
};

const mockActivatedRoute = {
  queryParams: of({})
};

const moduleMetadata: NgModule = {
  providers: [
    { provide: UserService, useValue: mockUserService },
    { provide: Router, useValue: mockRouter },
    { provide: ActivatedRoute, useValue: mockActivatedRoute }
  ]
};

storiesOf('Home', module).add('Login', () => ({
  component: LoginComponent,
  moduleMetadata
}));
