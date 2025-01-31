import { Observable } from 'rxjs';

import { Component, Input } from '@angular/core';

import { Transitions } from '../../shared/transitions';
import { Project } from '../project';
import { ProjectService } from '../project.service';

/**
 * This component is used to show a summary list of code projects. When a
 * project is selected, a separate detailed view should be shown.
 *
 * The component calls out to the backend for a list of projects, with the help
 * of the {@link ProjectService}.
 */
@Component({
    selector: 'jblog-projects-container',
    templateUrl: './projects-container.component.html',
    animations: [Transitions.visibilityFade],
    standalone: false
})
export class ProjectsContainerComponent {
  /**
   * Whether to show archived projects in the rendered HTML.
   */
  @Input() public showArchived = false;

  /**
   * List of projects to display.
   */
  public readonly projects$: Observable<Project[]>;
  /**
   * Constructor that takes an injectable {@link ProjectService} that the
   * component uses during its lifetime.
   */
  constructor(private projectService: ProjectService) {
    this.projects$ = this.projectService.getProjects();
  }
}
