import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { TitleService } from '../../shared/title.service';
import { MockTitleService } from '../../shared/mocks/mock-title.service';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  const mockTitleService = new MockTitleService();

  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PageHeroComponent, AboutComponent ],
      providers: [{ provide: TitleService, useValue: mockTitleService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // This is a static, content-only page and thus only
  // needs a basic test
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
