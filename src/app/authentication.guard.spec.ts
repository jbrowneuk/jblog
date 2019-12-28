import { of, throwError } from 'rxjs';
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

      it('should return true if user is logged in', done => {
        mockUserService
          .setup(s => s.fetchUser())
          .returns(() => of({ uid: 'mock' }));

        (guard[method] as Function).call(guard, null, mockState).subscribe({
          next: actual => {
            expect(actual).toBeTruthy();
            done();
          }
        });
      });

      it('should return false if user is not logged in', done => {
        mockUserService.setup(s => s.fetchUser()).returns(() => of(null));

        (guard[method] as Function).call(guard, null, mockState).subscribe({
          next: actual => {
            expect(actual).toBeFalsy();
            done();
          }
        });
      });

      it('should redirect if user is not logged in', done => {
        mockUserService.setup(s => s.fetchUser()).returns(() => of(null));

        (guard[method] as Function).call(guard, null, mockState).subscribe({
          next: () => {
            mockRouter.verify(
              r => r.navigate(It.isValue(['/login']), It.isAny()),
              Times.once()
            );

            expect().nothing();
            done();
          }
        });
      });
    });
  });

  describe('canLoad', () => {
    const mockRoute = { path: 'mock-url' };

    it('should return true if user is logged in', done => {
      mockUserService
        .setup(s => s.fetchUser())
        .returns(() => of({ uid: 'mock' }));

      guard.canLoad(mockRoute, null).subscribe({
        next: actual => {
          expect(actual).toBeTruthy();
          done();
        }
      });
    });

    it('should return false if user is not logged in', done => {
      mockUserService.setup(s => s.fetchUser()).returns(() => of(null));

      guard.canLoad(mockRoute, null).subscribe({
        next: actual => {
          expect(actual).toBeFalsy();
          done();
        }
      });
    });

    it('should redirect if user is not logged in', done => {
      mockUserService.setup(s => s.fetchUser()).returns(() => of(null));

      guard.canLoad(mockRoute, null).subscribe({
        next: () => {
          mockRouter.verify(
            r => r.navigate(It.isValue(['/login']), It.isAny()),
            Times.once()
          );

          expect().nothing();
          done();
        }
      });
    });
  });
});
