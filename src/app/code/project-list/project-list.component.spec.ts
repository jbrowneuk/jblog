import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { ProjectsContainerComponent } from '../projects-container/projects-container.component';

import { ProjectService } from '../project.service';
import { MockProjectService } from '../mock-project.service';
import { TitleService } from '../../shared/title.service';
import { MockTitleService } from '../../shared/mocks/mock-title.service';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';

import { Project } from '../project';

// Classes under test
import { ProjectListComponent } from './project-list.component';

describe('ProjectListComponent', () => {
  const mockService = new MockProjectService();
  const mockTitleService = new MockTitleService();
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
        ProjectListComponent,
        PageHeroComponent
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
        { provide: ProjectService, useValue: mockService },
        { provide: TitleService, useValue: mockTitleService }
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
    expect(compiled.querySelector('#projects-blurb p').textContent)
      .toContain('The computer at your desk. The phone in your pocket.');
    expect(compiled.querySelector('#github-blurb h2').textContent)
      .toContain('GitHub');
  });

  it('should change page title', () => {
    expect(mockTitleService.mockTitle).toBe('Code');
  });
});
