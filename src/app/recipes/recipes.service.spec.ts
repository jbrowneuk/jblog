import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        RecipesService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([RecipesService], (service: RecipesService) => {
    expect(service).toBeTruthy();
    // TODO: this should be ported to the Angular 5 HttpClient
  }));
});
