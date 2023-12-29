import { of } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { TestBed } from '@angular/core/testing';
import { Router, RouterState } from '@angular/router';

import { AuthenticationGuard } from './authentication.guard';
import { UserService } from './services/user.service';

describe('AuthenticationGuard', () => {
  let mockUserService: IMock<UserService>;
  let mockRouter: IMock<Router>;
  let guard: AuthenticationGuard;

  let mockRouterState: IMock<RouterState>;

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

    guard = TestBed.inject(AuthenticationGuard);

    mockRouterState = Mock.ofType<RouterState>();
  });

  it('should initialise', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true if user is logged in', done => {
      mockUserService
        .setup(s => s.fetchUser())
        .returns(() => of({ uid: 'mock' }));

      guard.canActivate(mockRouterState.object).subscribe({
        next: actual => {
          expect(actual).toBeTruthy();
          done();
        }
      });
    });

    it('should return false if user is not logged in', done => {
      mockUserService.setup(s => s.fetchUser()).returns(() => of(null));

      guard.canActivate(mockRouterState.object).subscribe({
        next: actual => {
          expect(actual).toBeFalsy();
          done();
        }
      });
    });

    it('should redirect if user is not logged in', done => {
      mockUserService.setup(s => s.fetchUser()).returns(() => of(null));

      guard.canActivate(mockRouterState.object).subscribe({
        next: () => {
          mockRouter.verify(
            r => r.navigate(It.isValue(['/login']), It.isAny()),
            Times.once()
          );

          done();
        }
      });
    });
  });

  describe('canActivateChild', () => {
    it('should return true if user is logged in', done => {
      mockUserService
        .setup(s => s.fetchUser())
        .returns(() => of({ uid: 'mock' }));

      guard.canActivateChild(mockRouterState.object).subscribe({
        next: actual => {
          expect(actual).toBeTruthy();
          done();
        }
      });
    });

    it('should return false if user is not logged in', done => {
      mockUserService.setup(s => s.fetchUser()).returns(() => of(null));

      guard.canActivateChild(mockRouterState.object).subscribe({
        next: actual => {
          expect(actual).toBeFalsy();
          done();
        }
      });
    });

    it('should redirect if user is not logged in', done => {
      mockUserService.setup(s => s.fetchUser()).returns(() => of(null));

      guard.canActivateChild(mockRouterState.object).subscribe({
        next: () => {
          mockRouter.verify(
            r => r.navigate(It.isValue(['/login']), It.isAny()),
            Times.once()
          );

          done();
        }
      });
    });
  });

  describe('canLoad', () => {
    // const mockRoute = { path: 'mock-url' };

    it('should return true if user is logged in', done => {
      mockUserService
        .setup(s => s.fetchUser())
        .returns(() => of({ uid: 'mock' }));

      guard.canLoad(mockRouterState.object).subscribe({
        next: actual => {
          expect(actual).toBeTruthy();
          done();
        }
      });
    });

    it('should return false if user is not logged in', done => {
      mockUserService.setup(s => s.fetchUser()).returns(() => of(null));

      guard.canLoad(mockRouterState.object).subscribe({
        next: actual => {
          expect(actual).toBeFalsy();
          done();
        }
      });
    });

    it('should redirect if user is not logged in', done => {
      mockUserService.setup(s => s.fetchUser()).returns(() => of(null));

      guard.canLoad(mockRouterState.object).subscribe({
        next: () => {
          mockRouter.verify(
            r => r.navigate(It.isValue(['/login']), It.isAny()),
            Times.once()
          );

          done();
        }
      });
    });
  });
});
