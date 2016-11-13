import { Component, OnInit } from "@angular/core";

import { ProjectData }      from "./project-data.class";
import { ProjectsService }  from "./projects.service";

@Component({
  selector: "jblog-projects",
  templateUrl: "./project-list.component.html",
  providers: [ ProjectsService ]
})
export class ProjectListComponent implements OnInit {
  public projects: ProjectData[];
  public isLoaded: boolean;

  constructor(private projectsService: ProjectsService) {
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getProjectData();
  }

  public hasProjects(): boolean {
    return this.projects && this.projects.length > 0;
  }

  private getProjectData(): void {
    this.isLoaded = false;
    this.projectsService.getAllKnownProjects()
      .then(response => this.handleResponseData(response))
      .catch(e => this.handleResponseData([]));
  }

  private handleResponseData(data: ProjectData[]) {
    this.projects = data;
    this.isLoaded = true;
  }
}
