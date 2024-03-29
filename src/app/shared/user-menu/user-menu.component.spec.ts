import { of } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { UserMenuComponent } from './user-menu.component';

const Selectors = {
  buttonLogout: '[data-logout-button]'
};

describe('UserMenuComponent', () => {
  const mockUser = { uid: 'dawn' };

  let mockUserService: IMock<UserService>;
  let mockRouter: IMock<Router>;
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  beforeEach(async () => {
    mockUserService = Mock.ofType<UserService>();
    mockUserService
      .setup(s => s.authenticatedUser$)
      .returns(() => of(mockUser));

    mockRouter = Mock.ofType<Router>();

    TestBed.configureTestingModule({
      declarations: [UserMenuComponent],
      providers: [
        { provide: UserService, useFactory: () => mockUserService.object },
        { provide: Router, useFactory: () => mockRouter.object }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch current user on init', () => {
    component.ngOnInit();

    // At least once as the fixture.detectChanges in the beforeEach may call ngOnInit too
    mockUserService.verify(s => s.fetchUser(), Times.atLeastOnce());
  });

  it('should log out when button clicked', () => {
    const logoutButton = fixture.debugElement.query(
      By.css(Selectors.buttonLogout)
    );
    logoutButton.nativeElement.click();

    mockUserService.verify(s => s.endSession(), Times.once());
    mockUserService.verify(s => s.fetchUser(), Times.atLeastOnce());
  });

  it('should redirect to login page on log out', () => {
    const logoutButton = fixture.debugElement.query(
      By.css(Selectors.buttonLogout)
    );
    logoutButton.nativeElement.click();

    mockRouter.verify(r => r.navigate(It.isValue(['/login'])), Times.once());
  });
});
