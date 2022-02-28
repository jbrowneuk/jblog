import { of, throwError } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { TestBed } from '@angular/core/testing';

import { RestService } from './rest.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let mockRestService: IMock<RestService>;
  let service: UserService;

  beforeEach(() => {
    mockRestService = Mock.ofType<RestService>();

    TestBed.configureTestingModule({
      providers: [
        { provide: RestService, useFactory: () => mockRestService.object }
      ]
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchUser', () => {
    const mockToken = 'knight to B5';
    const mockUser = { uid: 'sausages' };

    beforeEach(() => {
      // Mocked functionality: return user token if auth header is set at all
      mockRestService
        .setup(s => s.get<any>(It.isAnyString(), It.isAny()))
        .returns((_: string, headers: any) => {
          if (headers.Authorization === mockToken) {
            return of(mockUser);
          }

          return of(null);
        });
    });

    it('should retrieve user info if token is set', done => {
      // Required as it seems impossible to reliably mock localStorage using spyOn
      spyOn(service as any, 'getSession').and.returnValue(mockToken);

      service.fetchUser().subscribe({
        next: userInfo => {
          expect(userInfo).toEqual(mockUser);
          done();
        }
      });
    });

    it('should return null if token is not set', done => {
      spyOn(service as any, 'getSession').and.returnValue(null);

      service.fetchUser().subscribe({
        next: userInfo => {
          expect(userInfo).toBeNull();
          done();
        }
      });
    });
  });

  describe('initialiseSession', () => {
    it('should set session if credentials passed and endpoint returns success', done => {
      const validName = 'dawn';
      const validPass = 'hikari';
      const mockToken = 'token';

      mockRestService
        .setup(s => s.post(It.isAnyString(), It.isAny()))
        .returns(() => of(mockToken));

      const setSpy = spyOn(service as any, 'setSession');

      service.initialiseSession(validName, validPass).subscribe({
        next: token => {
          expect(token).toEqual(mockToken);
          expect(setSpy).toHaveBeenCalledWith(mockToken);
          done();
        }
      });
    });

    it('should unset session if credentials passed and endpoint returns error', done => {
      const invalidName = 'asdfasdfasd';
      const invalidPass = 'asdfasdfdas';

      mockRestService
        .setup(s => s.post(It.isAnyString(), It.isAny()))
        .returns(() => throwError(() => new Error('fail')));

      const setSpy = spyOn(service as any, 'endSession');

      service.initialiseSession(invalidName, invalidPass).subscribe({
        next: token => {
          fail('Should not get here');
        },
        error: (error: Error) => {
          expect(error).not.toBeNull();
          expect(setSpy).toHaveBeenCalled();
          done();
        }
      });
    });
  });

  describe('end session', () => {
    // Cannot mock out localStorage reliably; this cannot currently be tested
    it('should end the session when called', done => {
      let logoutSent = false;

      service.authenticatedUser$.subscribe({
        next: user => {
          if (!logoutSent) {
            return;
          }

          expect(user).toBeNull();
          done();
        }
      });

      logoutSent = true;
      service.endSession();
    });
  });

  describe('User properties', () => {
    it('should return whether user is logged in', done => {
      // Mock out session storage
      spyOn(service as any, 'setSession');
      spyOn(service as any, 'getSession').and.returnValue('anything');

      const mockUser = { uid: 'a' };

      // No user fetch request
      expect(service.isLoggedIn).toBeFalsy();

      // Mocked login
      mockRestService
        .setup(s => s.get(It.isAny(), It.isAny()))
        .returns(() => of(mockUser));

      service.fetchUser().subscribe({
        next: () => {
          expect(service.isLoggedIn).toBeTruthy();

          done();
        }
      });
    });
  });

  describe('authorized GET convenience method', () => {
    it('should GET with authentication header when logged in', () => {
      const url = './any?url';
      const token = 'mytoken';
      spyOn(service as any, 'getSession').and.returnValue(token);

      service.authGet<any>(url);

      mockRestService.verify(
        s => s.get<any>(It.isValue(url), It.isValue({ Authorization: token })),
        Times.once()
      );
      expect().nothing();
    });

    it('should not GET when not logged in', () => {
      const url = './any?url';
      spyOn(service as any, 'getSession').and.returnValue(null);

      service.authGet<any>(url);

      mockRestService.verify(
        s => s.get<any>(It.isAny(), It.isAny()),
        Times.never()
      );
      expect().nothing();
    });
  });

  describe('authorized POST convenience method', () => {
    it('should POST with authentication header when logged in', () => {
      const url = './any?url';
      const token = 'mytoken';
      const body = { prop: 'any data' };
      spyOn(service as any, 'getSession').and.returnValue(token);

      service.authPost(url, body);

      mockRestService.verify(
        s =>
          s.post(
            It.isValue(url),
            It.isValue(body),
            It.isValue({ Authorization: token })
          ),
        Times.once()
      );
      expect().nothing();
    });

    it('should not POST when not logged in', () => {
      const url = './any?url';
      spyOn(service as any, 'getSession').and.returnValue(null);

      service.authPost(url, { prop: 'any data' });

      mockRestService.verify(
        s => s.post(It.isAny(), It.isAny(), It.isAny()),
        Times.never()
      );
      expect().nothing();
    });
  });
});
