import { of, throwError } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { TestBed } from '@angular/core/testing';

import { RestService } from './rest.service';
import { TOKEN_IDENTIFIER, UserService } from './user.service';

describe('UserService', () => {
  let mockRestService: IMock<RestService>;
  let service: UserService;

  beforeEach(() => {
    // Ensure empty storage
    localStorage.clear();

    mockRestService = Mock.ofType<RestService>();

    TestBed.configureTestingModule({
      providers: [
        { provide: RestService, useFactory: () => mockRestService.object }
      ]
    });

    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    // Clear modified storage
    localStorage.clear();
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
        .setup(s => s.get(It.isAnyString(), It.isAny()))
        .returns((_: string, headers: { Authorization: string }) => {
          if (headers.Authorization === mockToken) {
            return of(mockUser);
          }

          return of(null);
        });
    });

    it('should retrieve user info if token is set', done => {
      localStorage.setItem(TOKEN_IDENTIFIER, mockToken);

      service.fetchUser().subscribe({
        next: userInfo => {
          expect(userInfo).toEqual(mockUser);
          done();
        }
      });
    });

    it('should return null if token is not set', done => {
      localStorage.removeItem(TOKEN_IDENTIFIER);

      service.fetchUser().subscribe({
        next: userInfo => {
          expect(userInfo).toBeNull();
          done();
        }
      });
    });
  });

  xdescribe('initialiseSession', () => {
    it('should set session if credentials passed and endpoint returns success', done => {
      const mockToken = 'token';

      mockRestService
        .setup(s => s.post(It.isAnyString(), It.isAny()))
        .returns(() => of(mockToken));

      service.initialiseSession('validName', 'validPass').subscribe({
        next: token => {
          expect(token).toEqual(mockToken);
          expect(localStorage.getItem(TOKEN_IDENTIFIER)).toBe(mockToken);
          done();
        }
      });
    });

    it('should unset session if credentials passed and endpoint returns error', done => {
      mockRestService
        .setup(s => s.post(It.isAnyString(), It.isAny()))
        .returns(() => throwError(() => new Error('fail')));

      service.initialiseSession('invalidName', 'invalidPass').subscribe({
        next: () => {
          fail('Should not get here');
        },
        error: (error: Error) => {
          expect(error).not.toBeNull();
          expect(localStorage.getItem(TOKEN_IDENTIFIER)).toBeFalsy();
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
      const mockUser = { uid: 'a' };

      // No user fetch request
      expect(service.isLoggedIn).toBeFalsy();

      // Mocked login
      localStorage.setItem(TOKEN_IDENTIFIER, 'anything');
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
      localStorage.setItem(TOKEN_IDENTIFIER, token);

      service.authGet<string>(url);

      mockRestService.verify(
        s =>
          s.get<string>(It.isValue(url), It.isValue({ Authorization: token })),
        Times.once()
      );
    });

    it('should not GET when not logged in', () => {
      const url = './any?url';
      localStorage.removeItem(TOKEN_IDENTIFIER);

      service.authGet<string>(url);

      mockRestService.verify(
        s => s.get<string>(It.isAny(), It.isAny()),
        Times.never()
      );
    });
  });

  describe('authorized POST convenience method', () => {
    it('should POST with authentication header when logged in', () => {
      const url = './any?url';
      const token = 'mytoken';
      const body = { prop: 'any data' };
      localStorage.setItem(TOKEN_IDENTIFIER, token);

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
    });

    it('should not POST when not logged in', () => {
      const url = './any?url';
      localStorage.removeItem(TOKEN_IDENTIFIER);

      service.authPost(url, { prop: 'any data' });

      mockRestService.verify(
        s => s.post(It.isAny(), It.isAny(), It.isAny()),
        Times.never()
      );
    });
  });
});
