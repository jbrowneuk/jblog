import { Injectable }               from "@angular/core";
import { Headers, Http, Response }  from "@angular/http";

import "rxjs/add/operator/toPromise";

import { ProjectData } from "./project-data.class";

const ENDPOINT_URL = "/api/projects.php";

@Injectable()
export class ProjectsService {
  constructor(private http: Http) {}

  public getAllKnownProjects(): Promise<ProjectData[]> {
    return this.http.get(ENDPOINT_URL)
      .toPromise()
      .then(response => response.json().data as ProjectData[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
