import { TestBed, inject } from '@angular/core/testing';

import { RecipesServiceService } from './recipes-service.service';

describe('RecipesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipesServiceService]
    });
  });

  it('should be created', inject([RecipesServiceService], (service: RecipesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
