import { Component, OnInit } from '@angular/core';

import { Project } from '../project';

import { ProjectService } from '../project.service';

@Component({
  selector: 'jblog-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass', '../../../shared-sass/content-info-area.sass']
})
export class ProjectListComponent implements OnInit {

  public projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjectsForPage(1).subscribe(
      x => this.handleProjectListResponse(x),
      e => console.error(e)
    );
  }

  private handleProjectListResponse(response: Project[]): void {
    this.projects = response;
  }

}
