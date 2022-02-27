import { TestBed, inject } from '@angular/core/testing';

import { TransitionCompleteService } from './transition-complete.service';

describe('TransitionCompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransitionCompleteService]
    });
  });

  it('should notify subscriptions on change of state', inject(
    [TransitionCompleteService],
    (service: TransitionCompleteService) => {
      const expectedFromState = 'from-this';
      const expectedToState = 'to-this';

      let actualFromState = '';
      let actualToState = '';

      const subscription = service.subscribe((fromState, toState) => {
        actualFromState = fromState;
        actualToState = toState;
      });

      service.completedTransition(expectedFromState, expectedToState);

      subscription.unsubscribe();

      expect(actualFromState).toEqual(expectedFromState);
      expect(actualToState).toEqual(expectedToState);
    }
  ));
});
