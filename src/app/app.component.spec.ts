import { MockComponent } from 'ng-mocks';
import { Mock } from 'typemoq';

import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { PageObjectBase } from './lib/testing/page-object.base';
import { TransitionCompleteService } from './shared/transition-complete.service';
import { UserMenuComponent } from './shared/user-menu/user-menu.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let componentObject: AppComponentObject;

  beforeEach(() => {
    const mockTransitionCompleteService =
      Mock.ofType<TransitionCompleteService>();

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule],
      declarations: [AppComponent, MockComponent(UserMenuComponent)],
      providers: [
        {
          provide: TransitionCompleteService,
          useValue: mockTransitionCompleteService.object
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    componentObject = new AppComponentObject(fixture);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  // Check menu availability
  it('should render menu in the correct tag', () => {
    const menuLinks = componentObject.navigationMenuLinks;
    expect(menuLinks[0].textContent).toContain('portfolio');
    expect(menuLinks[1].textContent).toContain('projects');
    expect(menuLinks[2].textContent).toContain('art');
    expect(menuLinks[3].textContent).toContain('posts');
  });

  it('should render page footer', () => {
    expect(componentObject.pageFooter).toBeTruthy();
  });
});

class AppComponentObject extends PageObjectBase<AppComponent> {
  get navigationMenuLinks() {
    return this.selectAllByDataAttribute('nav-link');
  }

  get pageFooter() {
    return this.select('#page-footer');
  }
}
