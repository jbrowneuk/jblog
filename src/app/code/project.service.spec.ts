import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { GithubRepoData } from './github-repo-data';
import { ProjectService, RepoApiEndpoint } from './project.service';

function createMockRepoData(
  id: number,
  isArchived = false
): GithubRepoData {
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
    created_at: '2024-01-01T12:00:00Z',
    updated_at: '2024-01-02T12:00:00Z',
    pushed_at: '2024-01-03T12:00:00Z',
    stargazers_count: 0,
    watchers_count: 0,
    language: 'My language',
    forks_count: 0,
    archived: isArchived,
    open_issues_count: 0,
    license: {
      name: 'MIT License'
    },
    forks: 0,
    open_issues: 0,
    watchers: 0
  };
}

describe('ProjectService', () => {
  let httpTestingController: HttpTestingController;
  let mockRepositories: GithubRepoData[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    }).compileComponents();
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    mockRepositories = [createMockRepoData(123456), createMockRepoData(123457)];
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

          expect(project.name).toBe(rawData['name']);
          expect(project.description).toBe(rawData['description']);
          expect(project.language).toBe(rawData['language']);
          expect(project.license).toBe(rawData['license'].name);
          expect(project.link).toBe(rawData['html_url']);
          expect(project.archived).toBe(rawData['archived']);
          expect(project.stars).toBe(rawData['stargazers_count']);
          expect(project.watchers).toBe(rawData['watchers_count']);
          expect(project.forks).toBe(rawData['forks_count']);
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

      service.getProjects().subscribe({
        next: () => fail('should not get here'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toEqual(emsg);
        }
      });

      const req = httpTestingController.expectOne(RepoApiEndpoint);
      expect(req.request.method).toEqual('GET');
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    }
  ));
});
