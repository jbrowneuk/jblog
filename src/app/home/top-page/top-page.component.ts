import { interval, Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { TitleService } from '../../shared/title.service';
import { TopPageTransitions } from './top-page.animations';

const intervalMsec = 8000;
const maxSlides = 3;

/**
 * The component that renders the top (home) page.
 */
@Component({
  selector: 'jblog-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: [
    './top-page.component.scss',
    './top-page.responsive.scss',
    './top-page.slideshow.scss',
    './top-page.indicators.scss'
  ],
  animations: TopPageTransitions
})
export class TopPageComponent implements OnInit, OnDestroy {
  private carouselInterval?: Subscription;

  public slideNumber: number;
  public totalSlides: number;

  constructor(private titleService: TitleService) {
    this.slideNumber = 0;
    this.totalSlides = maxSlides;
  }

  public ngOnInit() {
    this.titleService.resetTitle();
    this.setupSlideInterval();
  }

  public ngOnDestroy() {
    this.clearSlideInterval();
  }

  public advanceCarousel(): void {
    this.slideNumber = (this.slideNumber + 1) % this.totalSlides;
  }

  public goToNextSlide(): void {
    const slide = (this.slideNumber + 1) % this.totalSlides;
    this.setSlide(slide);
  }

  public goToPreviousSlide(): void {
    const slide =
      (this.slideNumber > 0 ? this.slideNumber : this.totalSlides) - 1;
    this.setSlide(slide);
  }

  public setSlide(id: number): void {
    this.clearSlideInterval();
    this.slideNumber = id;
    this.setupSlideInterval();
  }

  private setupSlideInterval(): void {
    this.carouselInterval = interval(intervalMsec).subscribe(() =>
      this.advanceCarousel()
    );
  }

  private clearSlideInterval(): void {
    if (this.carouselInterval) {
      this.carouselInterval.unsubscribe();
      this.carouselInterval = undefined;
    }
  }
}
