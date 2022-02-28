import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Project } from './project';

// Exported for use in unit test
export const RepoApiEndpoint =
  'https://api.github.com/users/jbrowneuk/repos?sort=updated';

/**
 * A service which handles requesting projects and their details from an API
 * backend.
 */
@Injectable()
export class ProjectService {
  /**
   * Injecting constructor.
   */
  constructor(private http: HttpClient) {}

  /**
   * Calls out to the backend and gets a list of projects.
   *
   * @param pageNumber {number} the page number to load.
   * @param amount {number} optional number of projects to load.
   */
  public getProjects(): Observable<Project[]> {
    return this.http
      .get<any>(RepoApiEndpoint)
      .pipe(map(this.convertToProjects));
  }

  private convertToProjects(ghProjects: any[]): Project[] {
    const projects: Project[] = [];
    ghProjects.forEach((ghProject: any) => {
      const license = ghProject.license ? ghProject.license.name : 'No license';
      const project: Project = {
        name: ghProject.name,
        description: ghProject.description || 'No description',
        language: ghProject.language || 'Not specified',
        license,
        link: ghProject.html_url,
        archived: !!ghProject.archived,
        stars: ghProject.stargazers_count || 0,
        watchers: ghProject.watchers_count || 0,
        forks: ghProject.forks_count || 0
      };
      projects.push(project);
    });

    return projects;
  }
}
