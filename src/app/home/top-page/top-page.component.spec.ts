import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { It, Mock, IMock } from 'typemoq';

import { TitleService } from '../../shared/title.service';

import { TopPageComponent } from './top-page.component';

describe('Top Page', () => {
  let mockTitleService: IMock<TitleService>;
  let component: TopPageComponent;
  let fixture: ComponentFixture<TopPageComponent>;

  beforeEach(async(() => {
    mockTitleService = Mock.ofType<TitleService>();
    mockTitleService.setup(x => x.setTitle(It.isAnyString()));
    mockTitleService.setup(x => x.resetTitle());

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TopPageComponent],
      providers: [
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TopPageComponent);
        component = fixture.componentInstance;

        // Stop interval interfering with tests
        spyOn(component as any, 'setupSlideInterval');

        fixture.detectChanges();
      });
  }));

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment slide on advanceCarousel call', () => {
    expect(component.slideNumber).toBe(0);
    component.advanceCarousel();
    expect(component.slideNumber).toBe(1);
  });

  it('should wrap to first slide when on last slide on advanceCarousel call', () => {
    component.slideNumber = component.totalSlides - 1;
    component.advanceCarousel();
    expect(component.slideNumber).toBe(0);
  });

  it('should set slide', () => {
    const expectedSlide = 2;

    component.setSlide(expectedSlide);
    expect(component.slideNumber).toBe(expectedSlide);
  });
});
