import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ScrollDirectiveBase } from './scroll-directive.base';

import { TransitionCompleteService } from './transition-complete.service';

@Directive({ selector: '[jblogIsOnScreen]' })
export class OnScreenDirective extends ScrollDirectiveBase {
  @Input() targetPercentage = 70;
  @Output() isElementVisible: EventEmitter<boolean> = new EventEmitter();

  private isFirstRun: boolean;
  private lastValue: boolean;

  constructor(relatedElement: ElementRef, transitionService: TransitionCompleteService) {
    super(relatedElement, transitionService);
    this.lastValue = false;
    this.isFirstRun = true;
  }

  protected handleUpdate(): void {
    const overrideValue = this.isFirstRun && this.isOnScreen;
    this.isFirstRun = false;

    const isInView = (this.isInCentralPercentage() || overrideValue) && this.isOnScreen;

    if (isInView !== this.lastValue) {
      this.lastValue = isInView;
      this.isElementVisible.emit(this.lastValue);
    }
  }

  private isInCentralPercentage(): boolean {
    const targetAreaHeight = this.viewportHeight * (this.targetPercentage / 100);
    const targetAreaBuffer = (this.viewportHeight - targetAreaHeight) / 2;

    const top = this.relatedElementBounds.top;
    const bottom = this.relatedElementBounds.bottom;

    const topIsInView = top >= targetAreaBuffer && top < this.viewportHeight - targetAreaBuffer;
    const bottomIsInView = bottom <= this.viewportHeight - targetAreaBuffer && bottom > targetAreaBuffer;
    return topIsInView || bottomIsInView;
  }
}
