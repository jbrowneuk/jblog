import { of, throwError } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { UserService } from '../../services/user.service';
import { LoginComponent } from './login.component';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';

describe('LoginComponent', () => {
  let mockUserService: IMock<UserService>;
  let mockRouter: IMock<Router>;
  let mockActivatedRoute: ActivatedRouteStub;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let pageObject: LoginPageObject;

  beforeEach(() => {
    mockUserService = Mock.ofType<UserService>();
    mockRouter = Mock.ofType<Router>();
    mockActivatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useFactory: () => mockUserService.object },
        { provide: Router, useFactory: () => mockRouter.object },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    pageObject = new LoginPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login on submission behaviour', () => {
    it('should attempt to log in user when submit button is clicked', () => {
      const username = 'dawn';
      const password = 'hikari';

      mockUserService
        .setup((s) => s.initialiseSession(It.isAnyString(), It.isAnyString()))
        .returns(() => of('faketoken'));
      mockUserService
        .setup((s) => s.fetchUser())
        .returns(() => of({ uid: 'mock' }));

      pageObject.sendInput(pageObject.inputUsername.nativeElement, username);
      pageObject.sendInput(pageObject.inputPassword.nativeElement, password);

      fixture.detectChanges();

      pageObject.click(pageObject.submit.nativeElement);

      mockUserService.verify(
        (s) => s.initialiseSession(It.isValue(username), It.isValue(password)),
        Times.once()
      );

      // Verified using typemoq above
      expect().nothing();
    });

    it('should attempt to fetch user data user when login successful', (done) => {
      mockUserService
        .setup((s) => s.initialiseSession(It.isAnyString(), It.isAnyString()))
        .returns(() => of('faketoken'));
      mockUserService
        .setup((s) => s.fetchUser())
        .returns(() => of({ uid: 'mock' }));

      component.loginForm?.get('username')?.setValue('dawn');
      component.loginForm?.get('password')?.setValue('hikari');
      component.submitForm(new MouseEvent('click'));

      setTimeout(() => {
        mockUserService.verify((s) => s.fetchUser(), Times.once());

        // Verified using typemoq above
        expect().nothing();
        done();
      });
    });

    it('should show login error if login unsuccessful', (done) => {
      mockUserService
        .setup((s) => s.initialiseSession(It.isAnyString(), It.isAnyString()))
        .returns(() => throwError(() => 'faketoken'));

      component.loginForm?.get('username')?.setValue('dawn');
      component.loginForm?.get('password')?.setValue('hikari');
      component.submitForm(new MouseEvent('click'));

      fixture.detectChanges();

      setTimeout(() => {
        mockRouter.verify((r) => r.navigate(It.isAny()), Times.never());

        expect(pageObject.errorMessage).toBeTruthy();
        done();
      });
    });
  });

  describe('redirect behaviour', () => {
    beforeEach(() => {
      // Set up user service in ‘no user’ state
      // This ensures the redirect in ngOnInit is not fired
      mockUserService
        .setup((s) => s.initialiseSession(It.isAnyString(), It.isAnyString()))
        .returns(() => of('faketoken'));
      mockUserService
        .setup((s) => s.fetchUser())
        .returns(() => of({ uid: 'mock' }));
      mockUserService
        .setup((s) => s.authenticatedUser$)
        .returns(() => of(null));
    });

    it('should redirect on login if returnTo param set', (done) => {
      const expectedUrl = 'any-page-here';
      mockActivatedRoute.setQueryParams({ returnTo: expectedUrl });

      component.loginForm?.get('username')?.setValue('dawn');
      component.loginForm?.get('password')?.setValue('hikari');

      // Initialise component here
      fixture.detectChanges();

      component.submitForm(new Event('mock'));

      setTimeout(() => {
        mockRouter.verify(
          (r) => r.navigate(It.isValue(['/', expectedUrl])),
          Times.once()
        );

        expect().nothing();
        done();
      });
    });

    it('should redirect to admin panel on login if returnTo param not set', (done) => {
      component.loginForm?.get('username')?.setValue('dawn');
      component.loginForm?.get('password')?.setValue('hikari');

      // Initialise component here
      fixture.detectChanges();

      component.submitForm(new Event('mock'));

      setTimeout(() => {
        mockRouter.verify(
          (r) => r.navigate(It.isValue(['/', 'admin'])),
          Times.once()
        );

        expect().nothing();
        done();
      });
    });
  });
});

class LoginPageObject extends PageObjectBase<LoginComponent> {
  public get inputUsername() {
    return this.selectDebug('[data-username]');
  }

  public get inputPassword() {
    return this.selectDebug('[data-password]');
  }

  public get submit() {
    return this.selectDebug('[data-submit]');
  }

  public get errorMessage() {
    return this.selectDebug('[data-error-message]');
  }
}
