import { AfterViewInit, AnimationTransitionEvent, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TRANSITIONS } from './route-transitions';

const invalidIdentifier = -1;

@Component({
  animations: TRANSITIONS,
  selector: 'jblog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private currentSectionId: number;

  @ViewChild('outlet') outlet: RouterOutlet;

  constructor() {
    this.currentSectionId = invalidIdentifier;
  }

  public ngAfterViewInit() {
    console.log(this.outlet.activatedRouteData);
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
    console.log(`Completed ${event.fromState} => ${event.toState}. Now on sId ${this.currentSectionId}`);
  }
}
