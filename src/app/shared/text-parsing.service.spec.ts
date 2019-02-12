import { TestBed, inject } from '@angular/core/testing';
import { TextParsingService } from './text-parsing.service';

describe('TextParsingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextParsingService]
    });
  });

  it('should parse text and emoji', inject(
    [TextParsingService],
    (service: TextParsingService) => {
      expect(service).toBeTruthy();

      const input = '😄 :blush:';
      const output = service.parse(input);

      expect(output).toContain(
        '<img class="emojione" alt="😄" title=":smile:" src="'
      );
      expect(output).toContain(
        '<img class="emojione" alt="😊" title=":blush:" src="'
      );
    }
  ));
});
