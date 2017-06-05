import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        },
        ProjectService
      ]
    });
  });

  it('should get all projects', inject([ProjectService], (service: ProjectService) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: [
            {
              id: 26,
              contentRendered: '<p><b>Hi there</b></p>',
              contentMarkdown: '*Hi there*'
            }]
        }
      )));
    });

    const projects = service.getProjects(0).subscribe(response => {
      expect(response).not.toBeNull();
    });
  }));
});
