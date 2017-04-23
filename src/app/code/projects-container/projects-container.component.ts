import { Component, Input, OnInit } from '@angular/core';

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
  styleUrls: [
    '../../../shared-sass/content-info-area.scss'
  ]
})
export class ProjectsContainerComponent implements OnInit {

  /**
   * The current page to display.
   */
  @Input() public page = 1;

  /**
   * A customisable number of projects to load. If zero or negative, uses the
   * default value provided by the service.
   */
  @Input() public projectCount = -1;

  /**
   * List of projects to display.
   */
  public projects: Project[];

  /**
   * Constructor that takes an injectable {@link ProjectService} that the
   * component uses during its lifetime.
   */
  constructor(private projectService: ProjectService) { }

  /**
   * When initialized, use the {@link ProjectService} to get a page of projects.
   */
  ngOnInit() {
    this.projectService.getProjects(this.page, this.projectCount).subscribe(
      x => this.handleProjectListResponse(x),
      e => console.error(e)
    );
  }

  /**
   * Handles a successful project response.
   */
  private handleProjectListResponse(response: Project[]): void {
    this.projects = response;
  }

}
