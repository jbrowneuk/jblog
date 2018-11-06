import { AfterViewInit, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TransitionCompleteService } from './transition-complete.service';

export interface ScrollPosition {
  scrollHeight: number;
  scrollTop: number;
  clientHeight: number;
}

export abstract class ScrollDirectiveBase implements AfterViewInit, OnDestroy {
  private lastKnownPosition: ScrollPosition;
  private lastScrollWasDown: boolean;
  private isTicking: boolean;
  private subscription: Subscription;

  /**
   * Gets the vertical distance down the page
   */
  protected get yPosition(): number {
    return this.lastKnownPosition.scrollTop;
  }

  /**
   * Gets whether the last scroll direction was downwards
   */
  protected get isScrollingDown(): boolean {
    return this.lastScrollWasDown;
  }

  /**
   * Gets all the information related to the current scroll position
   */
  protected get scrollPosition(): ScrollPosition {
    return this.lastKnownPosition;
  }

  /**
   * Gets the element this directive is placed upon
   */
  protected get relatedElement(): HTMLElement {
    return this.element.nativeElement as HTMLElement;
  }

  /**
   * Gets the bounds of the related element
   */
  protected get relatedElementBounds(): ClientRect {
    return this.relatedElement.getBoundingClientRect();
  }

  /**
   * Gets whether the element is within the screen bounds
   */
  protected get isOnScreen(): boolean {
    const containerHeight = this.relatedElementBounds.height;

    const top = this.relatedElementBounds.top;
    const bottom = this.relatedElementBounds.bottom;
    const windowHeight = window.innerHeight;

    return bottom > 0 && top < windowHeight;
  }

  /**
   * Convenience - gets the height of the viewport, i.e. window or scrollable view
   */
  protected get viewportHeight(): number {
    return window.innerHeight;
  }

  constructor(private element: ElementRef, private transitionCompleteService: TransitionCompleteService) {
    this.lastKnownPosition = {
      scrollHeight: 0,
      scrollTop: 0,
      clientHeight: 0
    };

    this.subscription = transitionCompleteService.subscribe((fromState: string, toState: string) => {
      this.onScroll({ target: document });
    });
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
