import { Directive, ElementRef, Input } from '@angular/core';
import { ScrollDirectiveBase } from './scroll-directive.base';

@Directive({ selector: '[jblogInfiniteScroll]' })
export class InfiniteScrollDirective extends ScrollDirectiveBase {
  @Input() callbackPercentage = 80;
  @Input() callback?: () => void;
  @Input() shouldBlockAfterCallback = true;
  private lastCallbackPosition: number;

  constructor(relatedElement: ElementRef) {
    super(relatedElement);
    this.lastCallbackPosition = 0;
  }

  protected handleUpdate(): void {
    if (!this.isScrollingDown || !this.isScrolledToPosition()) {
      return;
    }

    if (this.lastCallbackPosition >= this.yPosition) {
      return;
    }

    // If the blocking flag is set, it means the page size might change after an
    // async operation. Thus, the directive shouldn't fire again immediately
    // until after the page size has changed.
    let positionControl;
    if (this.shouldBlockAfterCallback) {
      positionControl = this.scrollPosition.scrollHeight;
    } else {
      positionControl = this.yPosition;
    }

    this.lastCallbackPosition = positionControl;
    this.callback && this.callback();
  }

  private isScrolledToPosition(): boolean {
    const position = this.scrollPosition;

    // Sanity check
    if (position.scrollHeight === 0) {
      return false;
    }

    const scrollPercentage =
      (position.scrollTop + position.clientHeight) / position.scrollHeight;
    const triggerPosition = this.callbackPercentage / 100;

    return scrollPercentage > triggerPosition;
  }
}
