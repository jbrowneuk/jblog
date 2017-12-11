import { Component, OnInit } from '@angular/core';

import { TitleService } from '../../shared/title.service';

/**
 * This component wraps the {@link ProjectsContainerComponent} and adds some
 * information about the projects in general. It contains no real logic, instead
 * delegating tasks etc. to the contained components.
 */
@Component({
  selector: 'jblog-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle('Code');
  }
}
