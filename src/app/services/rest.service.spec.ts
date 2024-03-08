import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Headers, RestService } from './rest.service';

type GenericObject = { [key: string]: string };

describe('Rest Service', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service: RestService = TestBed.inject(RestService);
    expect(service).toBeTruthy();
  });

  describe('GET method', () => {
    it('should GET from url', done => {
      const service: RestService = TestBed.inject(RestService);
      const mockResponse = { status: 'tested' };
      const mockUrl = 'http://localhost/url';

      service.get<GenericObject>(mockUrl).subscribe({
        next: data => {
          httpTestingController.verify();
          expect(data).toEqual(mockResponse);
          done();
        }
      });

      const req = httpTestingController.expectOne(mockUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });

    it('should add HTTP headers to GET request', done => {
      const service: RestService = TestBed.inject(RestService);
      const mockResponse = { status: 'tested' };
      const mockUrl = 'http://localhost/url';
      const mockHeaders: Headers = { PoweredBy: 'A Test Runner' };

      service.get<GenericObject>(mockUrl, mockHeaders).subscribe({
        next: data => {
          httpTestingController.verify();
          expect(data).toEqual(mockResponse);
          done();
        }
      });

      const req = httpTestingController.expectOne(mockUrl);
      expect(req.request.method).toEqual('GET');

      const mockHeaderKeys = Object.keys(mockHeaders);
      mockHeaderKeys.forEach(key => {
        const actualHeaderValue = req.request.headers.get(key) as string;
        expect(mockHeaders[key]).toBe(actualHeaderValue);
      });

      req.flush(mockResponse);
    });
  });

  describe('POST method', () => {
    it('should POST to URL with body', done => {
      const service: RestService = TestBed.inject(RestService);
      const mockResponse = { test: 'true' }; // see note in the service file
      const mockUrl = 'http://localhost/url';
      const mockBody = { body: 'body' };

      service.post<GenericObject>(mockUrl, mockBody).subscribe({
        next: data => {
          httpTestingController.verify();
          expect(data).toEqual(mockResponse);
          done();
        }
      });

      const req = httpTestingController.expectOne(mockUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockBody);
      req.flush(mockResponse);
    });
  });
});
