import { Component, OnInit } from '@angular/core';

import { TitleService } from '../../shared/title.service';
import { ROUTE_TRANSITIONS } from './admin.route-animations';

@Component({
  selector: 'jblog-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [ROUTE_TRANSITIONS]
})
export class AdminComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle('Admin');
  }
}
