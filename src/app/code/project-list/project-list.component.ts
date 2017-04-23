import { Component } from '@angular/core';

/**
 * This component wraps the {@link ProjectsContainerComponent} and adds some
 * information about the projects in general. It contains no real logic, instead
 * delegating tasks etc. to the contained components.
 */
@Component({
  selector: 'jblog-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: [
    './project-list.component.scss',
    '../../../shared-sass/content-info-area.scss'
  ]
})
export class ProjectListComponent {
}
