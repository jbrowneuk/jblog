import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TransitionCompleteService } from './shared/transition-complete.service';

import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  const mockTransitionCompleteService = {
    completedTransition(s: string, s1: string) {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: TransitionCompleteService,
          useValue: mockTransitionCompleteService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // Check menu availability
  it('should render menu in the correct tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const menu = compiled.querySelectorAll('.links > li > a');
    expect(menu[0].textContent).toContain('portfolio');
    expect(menu[1].textContent).toContain('about');
    expect(menu[2].textContent).toContain('art');
    expect(menu[3].textContent).toContain('projects');
    expect(menu[4].textContent).toContain('posts');
  }));

  // Check footer availability
  it('should render footer in the correct tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    // Check the footer exists
    expect(compiled.querySelector('.page-footer')).toBeTruthy();
  }));
});
