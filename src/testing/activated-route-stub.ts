import { Observable, ReplaySubject } from 'rxjs';

import { convertToParamMap, ParamMap, Params } from '@angular/router';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  private paramMapSubject: ReplaySubject<ParamMap>;
  private queryParamSubject: ReplaySubject<Params>;

  constructor(initialParams?: Params) {
    this.paramMapSubject = new ReplaySubject<ParamMap>();
    this.queryParamSubject = new ReplaySubject<Params>(null);
    this.setParamMap(initialParams);
  }

  public get paramMap(): Observable<ParamMap> {
    return this.paramMapSubject.asObservable();
  }

  public get queryParams(): Observable<Params> {
    return this.queryParamSubject.asObservable();
  }

  /** Set the paramMap observables’s next value */
  setParamMap(params?: Params): void {
    this.paramMapSubject.next(convertToParamMap(params));
  }

  /** Set the queryParam observable’s next value */
  setQueryParams(params: Params): void {
    this.queryParamSubject.next(params);
  }
}
