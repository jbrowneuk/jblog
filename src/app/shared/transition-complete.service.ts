import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export class TransitionCompleteService {
  private transitionSubject: BehaviorSubject<[string, string]>;
  transitionComplete: Observable<[string, string]>;

  constructor() {
    this.transitionSubject = new BehaviorSubject<[string, string]>(['', '']);
    this.transitionComplete = this.transitionSubject.asObservable();
  }

  public completedTransition(fromState: string, toState: string): void {
    if (fromState === null || toState === null) {
      return;
    }

    this.transitionSubject.next([fromState, toState]);
  }

  subscribe(
    callback: (fromState: string, toState: string) => void
  ): Subscription {
    return this.transitionComplete.subscribe(
      (stateChange: [string, string]) => {
        callback(stateChange[0], stateChange[1]);
      }
    );
  }
}
