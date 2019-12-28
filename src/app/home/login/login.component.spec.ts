import { of, throwError } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { UserService } from '../../services/user.service';
import { LoginComponent } from './login.component';

const Selectors = {
  InputUsername: '[data-username]',
  InputPassword: '[data-password]',
  ButtonSubmit: '[data-submit]',
  LoginError: '[data-error-message]'
};

function sendInput(inputElement: DebugElement, value: string): void {
  const element = inputElement.nativeElement as HTMLInputElement;
  element.value = value;
  element.dispatchEvent(new Event('input'));
}

describe('LoginComponent', () => {
  let mockUserService: IMock<UserService>;
  let mockRouter: IMock<Router>;
  let mockActivatedRoute: ActivatedRouteStub;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(async () => {
    mockUserService = Mock.ofType<UserService>();
    mockRouter = Mock.ofType<Router>();
    mockActivatedRoute = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: UserService, useFactory: () => mockUserService.object },
        { provide: Router, useFactory: () => mockRouter.object },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should attempt to log in user when submit button is clicked', async(async () => {
    const username = 'dawn';
    const password = 'hikari';

    mockUserService
      .setup(s => s.initialiseSession(It.isAnyString(), It.isAnyString()))
      .returns(() => of('faketoken'));
    mockUserService
      .setup(s => s.fetchUser())
      .returns(() => of({ uid: 'mock' }));

    const inputUsername = fixture.debugElement.query(
      By.css(Selectors.InputUsername)
    );
    const inputPassword = fixture.debugElement.query(
      By.css(Selectors.InputPassword)
    );
    sendInput(inputUsername, username);
    sendInput(inputPassword, password);

    fixture.detectChanges();
    await fixture.whenStable();

    const button = fixture.debugElement.query(By.css(Selectors.ButtonSubmit));
    button.nativeElement.dispatchEvent(new MouseEvent('click'));

    mockUserService.verify(
      s => s.initialiseSession(It.isValue(username), It.isValue(password)),
      Times.once()
    );

    // Verified using typemoq above
    expect().nothing();
  }));

  it('should attempt to fetch user data user when login successful', done => {
    mockUserService
      .setup(s => s.initialiseSession(It.isAnyString(), It.isAnyString()))
      .returns(() => of('faketoken'));
    mockUserService
      .setup(s => s.fetchUser())
      .returns(() => of({ uid: 'mock' }));

    component.username = 'dawn';
    component.password = 'hikari';
    component.submitForm(new MouseEvent('click'));

    setTimeout(() => {
      mockUserService.verify(s => s.fetchUser(), Times.once());

      // Verified using typemoq above
      expect().nothing();
      done();
    });
  });

  it('should show login error if login unsuccessful', done => {
    mockUserService
      .setup(s => s.initialiseSession(It.isAnyString(), It.isAnyString()))
      .returns(() => throwError('faketoken'));

    component.username = 'dawn';
    component.password = 'hikari';
    component.submitForm(new MouseEvent('click'));

    fixture.detectChanges();

    setTimeout(() => {
      const loginError = fixture.debugElement.query(
        By.css(Selectors.LoginError)
      );

      mockRouter.verify(r => r.navigate(It.isAny()), Times.never());

      expect(loginError).toBeTruthy();
      done();
    });
  });
});

describe('LoginComponent — login redirects', () => {
  let mockUserService: IMock<UserService>;
  let mockRouter: IMock<Router>;
  let mockActivatedRoute: ActivatedRouteStub;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(async () => {
    mockUserService = Mock.ofType<UserService>();
    mockRouter = Mock.ofType<Router>();
    mockActivatedRoute = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: UserService, useFactory: () => mockUserService.object },
        { provide: Router, useFactory: () => mockRouter.object },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }));

  it('should redirect on login if returnTo param set', done => {
    // Set up user service in ‘no user’ state
    // This ensures the redirect in ngOnInit is not fired
    mockUserService
      .setup(s => s.initialiseSession(It.isAnyString(), It.isAnyString()))
      .returns(() => of('faketoken'));
    mockUserService
      .setup(s => s.fetchUser())
      .returns(() => of({ uid: 'mock' }));
    mockUserService.setup(s => s.authenticatedUser$).returns(() => of(null));

    const expectedUrl = 'any-page-here';
    mockActivatedRoute.setQueryParams({ returnTo: expectedUrl });

    component.username = 'valid';
    component.password = 'valid';

    // Initialise component here
    fixture.detectChanges();

    component.submitForm(new Event('mock'));

    setTimeout(() => {
      mockRouter.verify(
        r => r.navigate(It.isValue(['/', expectedUrl])),
        Times.once()
      );

      expect().nothing();
      done();
    });
  });

  it('should redirect on init if user logged in and returnTo param set', done => {
    const mockUser = { uid: 'mock' };
    mockUserService
      .setup(s => s.initialiseSession(It.isAnyString(), It.isAnyString()))
      .returns(() => of('faketoken'));
    mockUserService.setup(s => s.fetchUser()).returns(() => of(mockUser));
    mockUserService
      .setup(s => s.authenticatedUser$)
      .returns(() => of(mockUser));

    const expectedUrl = 'any-page-here';
    mockActivatedRoute.setQueryParams({ returnTo: expectedUrl });

    // Initialise component here
    fixture.detectChanges();

    setTimeout(() => {
      mockRouter.verify(
        r => r.navigate(It.isValue(['/', expectedUrl])),
        Times.once()
      );

      expect().nothing();
      done();
    });
  });
});
