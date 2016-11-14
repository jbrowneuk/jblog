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
    this.projects = [];
    this.projectsService.getAllKnownProjects()
      .then(response => this.handleResponseDataSuccess(response))
      .catch(e => this.handleResponseDataFailure(e));
  }

  private handleResponseDataSuccess(data: ProjectData[]): void {
    this.projects = data;
    this.isLoaded = true;
  }

  private handleResponseDataFailure(error: any): void {
    console.error("Upstream error", error);
    this.projects = [];
    this.isLoaded = true;
  }
}
