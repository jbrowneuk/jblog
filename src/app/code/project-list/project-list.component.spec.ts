import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Classes required for test set up
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { ProjectsContainerComponent } from '../projects-container/projects-container.component';
import { ProjectService } from '../project.service';
import { MockProjectService } from '../mock-project.service';
import { Project } from '../project';

// Classes under test
import { ProjectListComponent } from './project-list.component';

describe('ProjectListComponent', () => {
  const mockService = new MockProjectService();
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      declarations: [
        LineSplittingPipe,
        ProjectsContainerComponent,
        ProjectListComponent
      ],
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
        { provide: ProjectService, useValue: mockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display blurb', () => {
    expect(compiled.querySelector('#projects-blurb > p').textContent)
      .toContain('The computer at your desk. The phone in your pocket.');
    expect(compiled.querySelector('#github-blurb > h2').textContent)
      .toContain('GitHub');
  });
});
