import { TestBed, inject } from '@angular/core/testing';
import { TextParsingService } from './text-parsing.service';

describe('TextParsingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextParsingService]
    });
  });

  it('should ...', inject([TextParsingService], (service: TextParsingService) => {
    expect(service).toBeTruthy();
  }));
});
