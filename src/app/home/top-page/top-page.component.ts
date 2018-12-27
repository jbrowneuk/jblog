import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

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
    './top-page.component.scss'
  ],
  animations: TopPageTransitions
})
export class TopPageComponent implements OnInit, OnDestroy {
  private carouselInterval: Subscription;

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

  public setSlide(id: number): void {
    this.clearSlideInterval();
    this.slideNumber = id;
    this.setupSlideInterval();
  }

  private setupSlideInterval(): void {
    this.carouselInterval = interval(intervalMsec).subscribe(() => this.advanceCarousel());
  }

  private clearSlideInterval(): void {
    if (this.carouselInterval) {
      this.carouselInterval.unsubscribe();
      this.carouselInterval = null;
    }
  }
}
