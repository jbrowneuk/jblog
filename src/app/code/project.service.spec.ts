import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { ProjectService, RepoApiEndpoint } from './project.service';

function createMockRepoData(id: string, isArchived: boolean = false): any {
  return {
    id,
    name: `proj-${id}`,
    full_name: `user/proj-${id}`,
    owner: {
      login: 'user'
    },
    html_url: `https://github.com/user/proj-${id}`,
    description: `mock project ${id}`,
    fork: false,
    stargazers_count: 0,
    watchers_count: 0,
    forks_count: 0,
    language: 'My language',
    archived: isArchived,
    license: {
      name: 'MIT License'
    }
  };
}

const rawGithubRepo1 = createMockRepoData('123456');

const rawGithubRepo2 = {};

describe('ProjectService', () => {
  let httpTestingController: HttpTestingController;
  let mockRepositories: any[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    mockRepositories = [
      createMockRepoData('123456'),
      createMockRepoData('123457')
    ];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve GitHub repos from user API', inject(
    [ProjectService],
    (service: ProjectService) => {
      service.getProjects().subscribe(projects => {
        expect(projects.length).toBe(mockRepositories.length);
      });

      const req = httpTestingController.expectOne(RepoApiEndpoint);
      expect(req.request.method).toEqual('GET');
      req.flush(mockRepositories);
    }
  ));

  it('should convert GitHub repo data to project data', inject(
    [ProjectService],
    (service: ProjectService) => {
      service.getProjects().subscribe(projects => {
        for (let index = 0; index < projects.length; index++) {
          const rawData = mockRepositories[index];
          const project = projects[index];

          expect(project.name).toBe(rawData.name);
          expect(project.description).toBe(rawData.description);
          expect(project.language).toBe(rawData.language);
          expect(project.license).toBe(rawData.license.name);
          expect(project.link).toBe(rawData.html_url);
          expect(project.archived).toBe(rawData.archived);
          expect(project.stars).toBe(rawData.stargazers_count);
          expect(project.watchers).toBe(rawData.watchers_count);
          expect(project.forks).toBe(rawData.forks_count);
        }
      });

      const req = httpTestingController.expectOne(RepoApiEndpoint);
      expect(req.request.method).toEqual('GET');
      req.flush(mockRepositories);
    }
  ));

  it('Should handle errors when getting single project info', inject(
    [ProjectService],
    (service: ProjectService) => {
      const emsg = 'deliberate 404 error';

      service.getProjects().subscribe(
        () => fail('should not get here'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
      );

      const req = httpTestingController.expectOne(RepoApiEndpoint);
      expect(req.request.method).toEqual('GET');
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    }
  ));
});
