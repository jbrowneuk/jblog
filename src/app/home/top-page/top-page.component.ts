import { Component, OnInit } from '@angular/core';

import { TitleService } from '../../shared/title.service';

/**
 * The component that renders the top (home) page.
 */
@Component({
  selector: 'jblog-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: [
    './top-page.component.scss',
    '../../../shared-sass/content-info-area.scss'
  ]
})
export class TopPageComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.resetTitle();
  }
}
