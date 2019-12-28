import { IMock, It, Mock, Times } from 'typemoq';

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthenticationGuard } from './authentication.guard';
import { UserService } from './services/user.service';

describe('AuthenticationGuard', () => {
  let mockUserService: IMock<UserService>;
  let mockRouter: IMock<Router>;
  let guard: AuthenticationGuard;

  beforeEach(() => {
    mockUserService = Mock.ofType<UserService>();
    mockRouter = Mock.ofType<Router>();

    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: UserService, useFactory: () => mockUserService.object },
        { provide: Router, useFactory: () => mockRouter.object }
      ]
    });

    guard = TestBed.get(AuthenticationGuard);
  });

  it('should initialise', () => {
    expect(guard).toBeTruthy();
  });

  const testedMethods = ['canActivate', 'canActivateChild'];

  testedMethods.forEach(method => {
    describe(method, () => {
      const mockState = { url: 'mock-url' };

      it('should return true if user is logged in', () => {
        mockUserService.setup(s => s.isLoggedIn).returns(() => true);

        const actual = (guard[method] as Function).call(guard, null, mockState);

        expect(actual).toBeTruthy();
      });

      it('should return false if user is not logged in', () => {
        mockUserService.setup(s => s.isLoggedIn).returns(() => false);

        const actual = (guard[method] as Function).call(guard, null, mockState);

        expect(actual).toBeFalsy();
      });

      it('should redirect if user is not logged in', () => {
        mockUserService.setup(s => s.isLoggedIn).returns(() => false);

        (guard[method] as Function).call(guard, null, mockState);

        mockRouter.verify(
          r => r.navigate(It.isValue(['/login']), It.isAny()),
          Times.once()
        );

        expect().nothing();
      });
    });
  });

  describe('canLoad', () => {
    const mockRoute = { path: 'mock-url' };

    it('should return true if user is logged in', () => {
      mockUserService.setup(s => s.isLoggedIn).returns(() => true);

      const actual = guard.canLoad(mockRoute, null);

      expect(actual).toBeTruthy();
    });

    it('should return false if user is not logged in', () => {
      mockUserService.setup(s => s.isLoggedIn).returns(() => false);

      const actual = guard.canLoad(mockRoute, null);

      expect(actual).toBeFalsy();
    });

    it('should redirect if user is not logged in', () => {
      mockUserService.setup(s => s.isLoggedIn).returns(() => false);

      guard.canLoad(mockRoute, null);

      mockRouter.verify(
        r => r.navigate(It.isValue(['/login']), It.isAny()),
        Times.once()
      );

      expect().nothing();
    });
  });
});
