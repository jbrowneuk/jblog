import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in the correct tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.home-link span').textContent).toContain('Jason Browne');
  }));

  // Check menu availability
  it('should render menu in the correct tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const menu = compiled.querySelectorAll('#menu > li > a');
    expect(menu[0].textContent).toContain('portfolio');
    expect(menu[1].textContent).toContain('about');
    expect(menu[2].textContent).toContain('art');
    expect(menu[3].textContent).toContain('code');
    expect(menu[4].textContent).toContain('posts');
  }));

  // Check footer availability
  it('should render footer in the correct tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    // Check the footer exists
    expect(compiled.querySelector('.page-footer')).toBeTruthy();

    // Check the EmojiOne linkback exists (required for free usage)
    expect(compiled.querySelector('.page-footer > .container').textContent).toContain('Emoji provided free by Emoji One');
  }));
});
