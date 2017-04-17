import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

/**
 * A service used to parse text from its stored format into a form that can be
 * rendered on a web page
 */
@Injectable()
export class TextParsingService {

  /**
   * The emoji parsing engine, powered by emojiOne
   */
  private emojiParser: any;

  /**
   * Constructor
   */
  constructor() {
    this.emojiParser = require('emojione');
  }

  /**
   * Main text parsing method
   */
  public parse(input: string): string {
    if (!input) {
      return '';
    }

    return this.emojiParser.toImage(input);
  }

}
