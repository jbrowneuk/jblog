import { AnimationTransitionEvent, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TransitionCompleteService } from './shared/transition-complete.service';

import { TRANSITIONS } from './route-transitions';

const invalidIdentifier = -1;

@Component({
  animations: TRANSITIONS,
  selector: 'jblog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private currentSectionId: number;

  @ViewChild('outlet') outlet: RouterOutlet;

  constructor(private transitionCompleteService: TransitionCompleteService) {
    this.currentSectionId = invalidIdentifier;
  }

  public prepareRouteTransition(outlet): string {
    const doesNotHaveIdentifier = typeof outlet.activatedRouteData['sectionId'] === 'undefined';

    const sectionId = doesNotHaveIdentifier ? invalidIdentifier : outlet.activatedRouteData['sectionId'];
    if (!doesNotHaveIdentifier) {
      this.currentSectionId = sectionId;
    }

    if (this.currentSectionId === invalidIdentifier) {
      return null;
    }

    return `${this.currentSectionId}`;
  }

  public onPageTransitionComplete(event: AnimationTransitionEvent): void {
    this.transitionCompleteService.completedTransition(event.fromState, event.toState);
  }
}
