
import {of as observableOf,  Observable } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { It, Mock, Times } from 'typemoq';

import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { ProjectsContainerComponent } from '../projects-container/projects-container.component';

import { ProjectService } from '../project.service';
import { TitleService } from '../../shared/title.service';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';

import { Project } from '../project';

// Classes under test
import { ProjectListComponent } from './project-list.component';

const mockProjects = [{
  'name': 'test',
  'title': 'A test project',
  'summary': 'Description of the test project',
  'info': 'JSON data',
  'link': 'https://www.google.com/',
  'resourcesUrl': 'http://localhost:4200/assets/images/'
}];

describe('ProjectListComponent', () => {
  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));

  const mockProjectService = Mock.ofType<ProjectService>();
  mockProjectService.setup(x => x.getProjects(It.isAnyNumber(), It.isAnyNumber()))
    .returns(() => observableOf(mockProjects));

  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    mockTitleService.reset();

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
        { provide: ProjectService, useFactory: () => mockProjectService.object },
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    })
    .compileComponents();

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
    mockTitleService.verify(x => x.setTitle(It.isValue('Code')), Times.once());
  });
});
