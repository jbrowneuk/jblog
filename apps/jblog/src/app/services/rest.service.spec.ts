import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { Headers, RestService } from './rest.service';

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

      service.get(mockUrl).subscribe({
        next: (data: any) => {
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

      service.get(mockUrl, mockHeaders).subscribe({
        next: (data: any) => {
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
      const mockResponse = 'text'; // see note in the service file
      const mockUrl = 'http://localhost/url';
      const mockBody = { body: 'body' };

      service.post(mockUrl, mockBody).subscribe({
        next: (data: any) => {
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
