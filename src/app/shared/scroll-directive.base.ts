import { AfterViewInit, ElementRef, HostListener } from '@angular/core';

export interface ScrollPosition {
  scrollHeight: number;
  scrollTop: number;
  clientHeight: number;
}

export abstract class ScrollDirectiveBase implements AfterViewInit {
  private lastKnownPosition: ScrollPosition;
  private lastScrollWasDown: boolean;
  private isTicking: boolean;

  protected get yPosition(): number {
    return this.lastKnownPosition.scrollTop;
  }

  protected get isScrollingDown(): boolean {
    return this.lastScrollWasDown;
  }

  protected get scrollPosition(): ScrollPosition {
    return this.lastKnownPosition;
  }

  constructor(private element: ElementRef) {
    this.lastKnownPosition = {
      scrollHeight: 0,
      scrollTop: 0,
      clientHeight: 0
    };
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.lastKnownPosition = {
        scrollHeight: 0,
        scrollTop: window.scrollY,
        clientHeight: 0
      };
      this.handleUpdate();
    }, 100);
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll(evt: any) {
    const scrollingElement = evt.target.scrollingElement;
    this.lastScrollWasDown = this.lastKnownPosition.scrollTop < scrollingElement.scrollTop;

    this.lastKnownPosition = {
      scrollHeight: scrollingElement.scrollHeight,
      scrollTop: scrollingElement.scrollTop,
      clientHeight: scrollingElement.clientHeight
    };

    if (!this.isTicking) {
      window.requestAnimationFrame(() => {
        this.handleUpdate();
        this.isTicking = false;
      });
    }

    this.isTicking = true;
  }

  protected abstract handleUpdate(): void;
}
