import { of } from 'rxjs';

import { Router } from '@angular/router';
import { storiesOf } from '@storybook/angular';

import { UserService } from '../../services/user.service';
import { UserMenuComponent } from './user-menu.component';

const loggedOutUserService = {
  endSession: () => {},
  fetchUser: () => {},
  authenticatedUser$: of(null)
};

const loggedInUserService = {
  endSession: () => {},
  fetchUser: () => {},
  authenticatedUser$: of({ uid: 'real user' })
};

const fakeRouter = {
  navigate: () => {}
};

storiesOf('Shared/User Menu', module)
  .add('Logged out', () => ({
    component: UserMenuComponent,
    moduleMetadata: {
      providers: [
        { provide: UserService, useValue: loggedOutUserService },
        { provide: Router, useValue: fakeRouter }
      ]
    }
  }))
  .add('Logged in', () => ({
    component: UserMenuComponent,
    moduleMetadata: {
      providers: [
        { provide: UserService, useValue: loggedInUserService },
        { provide: Router, useValue: fakeRouter }
      ]
    }
  }));
