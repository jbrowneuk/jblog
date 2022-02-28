import { AnimationEvent } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TRANSITIONS } from './route-transitions';
import { TransitionCompleteService } from './shared/transition-complete.service';

const invalidIdentifier = -1;

@Component({
  animations: TRANSITIONS,
  selector: 'jblog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private currentSectionId: number;

  @ViewChild('outlet', { static: true }) outlet?: RouterOutlet;

  constructor(private transitionCompleteService: TransitionCompleteService) {
    this.currentSectionId = invalidIdentifier;
  }

  public get currentYear(): number {
    return new Date().getFullYear();
  }

  public prepareRouteTransition(outlet: RouterOutlet): string | null {
    const doesNotHaveIdentifier =
      typeof outlet.activatedRouteData['sectionId'] === 'undefined';

    const sectionId = doesNotHaveIdentifier
      ? invalidIdentifier
      : outlet.activatedRouteData['sectionId'];
    if (!doesNotHaveIdentifier) {
      this.currentSectionId = sectionId;
    }

    if (this.currentSectionId === invalidIdentifier) {
      return null;
    }

    return `${this.currentSectionId}`;
  }

  public onPageTransitionComplete(event: AnimationEvent): void {
    this.transitionCompleteService.completedTransition(
      event.fromState,
      event.toState
    );
  }
}
