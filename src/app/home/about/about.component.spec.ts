import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { It, Mock } from 'typemoq';

import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { TitleService } from '../../shared/title.service';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));
  mockTitleService.setup(x => x.resetTitle());

  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PageHeroComponent, AboutComponent ],
      providers: [{ provide: TitleService, useFactory: () => mockTitleService.object }]
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
