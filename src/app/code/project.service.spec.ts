import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Project } from './project';
import { ProjectService } from './project.service';

const mockFirstProject: Project = {
  name: 'test',
  title: 'test project',
  summary: 'test summary',
  info: 'some info',
  link: 'http://some.location/here',
  resourcesUrl: 'http://some.location/'
};

const mockSecondProject: Project = {
  name: 'test2',
  title: 'test project2',
  summary: 'test2 summary',
  info: 'some info2',
  link: 'http://some.location/here/2',
  resourcesUrl: 'http://some.location/2'
};

describe('ProjectService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get all projects from backend', inject(
    [ProjectService],
    (service: ProjectService) => {
      const mockResponse = [mockFirstProject, mockSecondProject];

      service.getProjects(0).subscribe((projects: Project[]) => {
        expect(projects.length).toBe(2);
        expect(projects[0]).toEqual(mockFirstProject);
        expect(projects[1]).toEqual(mockSecondProject);
      });

      const req = httpTestingController.expectOne(
        '/assets/mock-data/projects.json'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    }
  ));

  it('should get specific number of projects from backend', inject(
    [ProjectService],
    (service: ProjectService) => {
      const numberToFetch = 2;

      const mockResponse = [
        mockFirstProject,
        mockSecondProject,
        mockFirstProject,
        mockSecondProject
      ];

      service.getProjects(0, numberToFetch).subscribe((projects: Project[]) => {
        expect(projects.length).toBe(numberToFetch);
        expect(projects[0]).toEqual(mockFirstProject);
        expect(projects[1]).toEqual(mockSecondProject);
      });

      const req = httpTestingController.expectOne(
        '/assets/mock-data/projects.json'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    }
  ));

  it('Should handle errors when getting single album info', inject(
    [ProjectService],
    (service: ProjectService) => {
      const emsg = 'deliberate 404 error';

      service
        .getProjects(0)
        .subscribe(
          () => fail('should not get here'),
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(404, 'status');
            expect(error.error).toEqual(emsg, 'message');
          }
        );

      const req = httpTestingController.expectOne(
        '/assets/mock-data/projects.json'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    }
  ));
});
