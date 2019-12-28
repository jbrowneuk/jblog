import { Observable, ReplaySubject } from 'rxjs';

import { convertToParamMap, ParamMap, Params } from '@angular/router';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject: ReplaySubject<ParamMap>;

  constructor(initialParams?: Params) {
    this.subject = new ReplaySubject<ParamMap>();
    this.setParamMap(initialParams);
  }

  public get paramMap(): Observable<ParamMap> {
    return this.subject.asObservable();
  }

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  }
}
