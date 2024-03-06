import { MockComponents } from 'ng-mocks';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { IMock, Mock, Times } from 'typemoq';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { TitleService } from '../../shared/title.service';
import { AboutComponent } from '../about/about.component';
import { ArtworksComponent } from '../artworks/artworks.component';
import { SoftwareComponent } from '../software/software.component';
import { SuperHeroComponent } from '../super-hero/super-hero.component';
import { TopPageComponent } from './top-page.component';

describe('Top Page', () => {
  let mockTitleService: IMock<TitleService>;
  let fixture: ComponentFixture<TopPageComponent>;
  let pageObject: TopPageObject;

  beforeEach(() => {
    mockTitleService = Mock.ofType<TitleService>();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [
        TopPageComponent,
        MockComponents(
          AboutComponent,
          ArtworksComponent,
          SoftwareComponent,
          SuperHeroComponent
        )
      ],
      providers: [
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPageComponent);
    pageObject = new TopPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should reset title when initialised', () => {
    mockTitleService.verify(s => s.resetTitle(), Times.once());
  });

  it('should render expected components', () => {
    const superHero = pageObject.superHero;
    expect(superHero).toBeTruthy();
  });
});

class TopPageObject extends PageObjectBase<TopPageComponent> {
  get superHero() {
    return this.selectPredicate(By.directive(SuperHeroComponent));
  }
}
