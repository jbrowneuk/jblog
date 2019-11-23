import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuComponent } from './user-menu.component';
import { UserService } from '../../services/user.service';
import { IMock, Mock, Times, It } from 'typemoq';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

const Selectors = {
  buttonMenu: '[data-menu-button]',
  buttonLogout: '[data-logout-button]'
};

describe('UserMenuComponent', () => {
  const mockUser = { uid: 'dawn' };

  let mockUserService: IMock<UserService>;
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  beforeEach(async(async () => {
    mockUserService = Mock.ofType<UserService>();
    mockUserService
      .setup(s => s.authenticatedUser$)
      .returns(() => of(mockUser));

    await TestBed.configureTestingModule({
      declarations: [UserMenuComponent],
      providers: [
        { provide: UserService, useFactory: () => mockUserService.object }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch current user on init', () => {
    component.ngOnInit();

    // At least once as the fixture.detectChanges in the beforeEach may call ngOnInit too
    mockUserService.verify(s => s.fetchUser(), Times.atLeastOnce());

    // Prevents the test being marked as incomplete
    expect().nothing();
  });

  it('should log out when button clicked', async(async () => {
    // Open menu first so the logout button is shown!
    const menuButton = fixture.debugElement.query(By.css(Selectors.buttonMenu));
    menuButton.nativeElement.click();

    fixture.detectChanges();
    await fixture.whenStable();

    const logoutButton = fixture.debugElement.query(
      By.css(Selectors.buttonLogout)
    );
    logoutButton.nativeElement.click();

    mockUserService.verify(
      s => s.initialiseSession(It.isValue(''), It.isValue('')),
      Times.once()
    );
    mockUserService.verify(s => s.fetchUser(), Times.atLeastOnce());

    expect().nothing();
  }));
});
