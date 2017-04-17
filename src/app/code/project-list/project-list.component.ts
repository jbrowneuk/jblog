import { Component, OnInit } from '@angular/core';

import { Project } from '../project';
import { ProjectService } from '../project.service';

/**
 * This component is used to show a summary list of code projects. When a
 * project is selected, a separate detailed view should be shown.
 *
 * The component calls out to the backend for a list of projects, with the help
 * of the {ProjectService}.
 */
@Component({
  selector: 'jblog-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: [
    './project-list.component.sass',
    '../../../shared-sass/content-info-area.sass'
  ]
})
export class ProjectListComponent implements OnInit {

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
    this.projectService.getProjectsForPage(1).subscribe(
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
