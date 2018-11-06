
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ProjectService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it(
    'should get all projects from backend',
    inject([ProjectService, XHRBackend], (service, mockBackend) => {
      const mockResponse = {
        data: [mockFirstProject, mockSecondProject]
      };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service.getProjects(0).subscribe((projects: Project[]) => {
        expect(projects.length).toBe(2);
        expect(projects[0]).toEqual(mockFirstProject);
        expect(projects[1]).toEqual(mockSecondProject);
      });
    })
  );

  it(
    'should get specific number of projects from backend',
    inject([ProjectService, XHRBackend], (service, mockBackend) => {
      const numberToFetch = 2;

      const mockResponse = {
        data: [
          mockFirstProject,
          mockSecondProject,
          mockFirstProject,
          mockSecondProject
        ]
      };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service.getProjects(0, numberToFetch).subscribe((projects: Project[]) => {
        expect(projects.length).toBe(numberToFetch);
        expect(projects[0]).toEqual(mockFirstProject);
        expect(projects[1]).toEqual(mockSecondProject);
      });
    })
  );

  it(
    'Should handle errors when getting single album info',
    inject([ProjectService], (service: ProjectService) => {
      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(observableThrowError(new Error()));

      service
        .getProjects(0)
        .subscribe(
          (response: Project[]) => fail('should not get here'),
          (err: Error) => expect(err).toBeTruthy()
        );
    })
  );
});
