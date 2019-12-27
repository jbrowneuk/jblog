import { IMock, Mock } from 'typemoq';

import { async, inject, TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import { UserService } from './services/user.service';

describe('AuthenticationGuard', () => {
  let mockUserService: IMock<UserService>;
  let guard: AuthenticationGuard;

  beforeEach(() => {
    mockUserService = Mock.ofType<UserService>();

    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: UserService, useFactory: () => mockUserService.object }
      ]
    });

    guard = TestBed.get(AuthenticationGuard);
  });

  it('should initialise', () => {
    expect(guard).toBeTruthy();
  });

  const testedMethods = ['canActivate', 'canActivateChild', 'canLoad'];

  testedMethods.forEach(method => {
    describe(method, () => {
      it('should return true if user is logged in', () => {
        mockUserService.setup(s => s.isLoggedIn).returns(() => true);

        const actual = (guard[method] as Function).call(guard, null, null);

        expect(actual).toBeTruthy();
      });

      it('should return false if user is not logged in', () => {
        mockUserService.setup(s => s.isLoggedIn).returns(() => false);

        const actual = (guard[method] as Function).call(guard, null, null);

        expect(actual).toBeFalsy();
      });
    });
  });
});
