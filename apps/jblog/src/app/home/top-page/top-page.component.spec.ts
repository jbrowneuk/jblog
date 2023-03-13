import { IMock, It, Mock } from 'typemoq';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TitleService } from '../../shared/title.service';
import { TopPageComponent } from './top-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Top Page', () => {
  let mockTitleService: IMock<TitleService>;
  let component: TopPageComponent;
  let fixture: ComponentFixture<TopPageComponent>;

  beforeEach(() => {
    mockTitleService = Mock.ofType<TitleService>();
    mockTitleService.setup(x => x.setTitle(It.isAnyString()));
    mockTitleService.setup(x => x.resetTitle());

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [TopPageComponent],
      providers: [
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPageComponent);
    component = fixture.componentInstance;

    // Stop interval interfering with tests
    jest.spyOn(component as any, 'setupSlideInterval').mockImplementation(() => {});

    fixture.detectChanges();
  });

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
