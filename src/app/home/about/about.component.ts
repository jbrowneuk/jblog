import { Component, OnInit } from '@angular/core';

import { TitleService } from '../../shared/title.service';

/**
 * The component that renders the about page.
 */
@Component({
  selector: 'jblog-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle('About');
  }
}
