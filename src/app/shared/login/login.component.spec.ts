import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IMock, Mock, It, Times } from 'typemoq';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of, throwError } from 'rxjs';

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
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(async () => {
    mockUserService = Mock.ofType<UserService>();

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: UserService, useFactory: () => mockUserService.object }
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

      expect(loginError).toBeTruthy();
      done();
    });
  });
});
