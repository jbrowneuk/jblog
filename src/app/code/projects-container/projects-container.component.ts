import { Component, Input, OnInit } from '@angular/core';

import { Project } from '../project';
import { ProjectService } from '../project.service';
import { Transitions } from '../../shared/transitions';

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
  styleUrls: ['../project-list.shared.scss'],
  animations: [Transitions.visibilityFade]
})
export class ProjectsContainerComponent implements OnInit {
  /**
   * Whether to show archived projects in the rendered HTML.
   */
  @Input() public showArchived = false;

  /**
   * List of projects to display.
   */
  public projects: Project[];

  /**
   * Constructor that takes an injectable {@link ProjectService} that the
   * component uses during its lifetime.
   */
  constructor(private projectService: ProjectService) {
    this.projects = [];
  }

  /**
   * When initialized, use the {@link ProjectService} to get a page of projects.
   */
  ngOnInit() {
    this.projectService
      .getProjects()
      .subscribe(x => this.handleProjectListResponse(x), e => console.error(e));
  }

  /**
   * Handles a successful project response.
   */
  private handleProjectListResponse(response: Project[]): void {
    this.projects = response;
  }
}
