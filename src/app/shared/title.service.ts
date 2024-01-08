import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

const siteTitle = 'Jason Browne';

@Injectable()
export class TitleService {
  constructor(private titleService: Title) {}

  public resetTitle() {
    this.setTitle('');
  }

  public setTitle(title: string) {
    let formattedTitle: string;
    if (title) {
      formattedTitle = `: ${title}`;
    } else {
      formattedTitle = '';
    }

    this.titleService.setTitle(`${siteTitle}${formattedTitle}`);
  }
}
