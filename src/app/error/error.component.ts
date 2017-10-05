import { Component, OnInit } from '@angular/core';

import { TitleService } from '../shared/title.service';

/**
 * This component is used to surface an error to the user. It's mainly used for
 * 404 (page not found) errors.
 */
@Component({
  selector: 'jblog-error',
  templateUrl: './error.component.html',
  styleUrls: [
    '../../shared-sass/content-info-area.scss'
  ]
})
export class ErrorComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.resetTitle();
  }
}
