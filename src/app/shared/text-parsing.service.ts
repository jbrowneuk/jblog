import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Injectable()
export class TextParsingService {

  private emojiParser: any;

  constructor() {
    this.emojiParser = require('emojione');
  }

  public parse(input: string): string {
    if (!input) {
      return '';
    }

    return this.emojiParser.toImage(input);
  }

}
