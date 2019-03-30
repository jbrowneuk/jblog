import { of as observableOf } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { It, Mock, Times } from 'typemoq';

import { ProjectsContainerComponent } from '../projects-container/projects-container.component';

import { ProjectService } from '../project.service';
import { TitleService } from '../../shared/title.service';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';

// Classes under test
import { ProjectListComponent } from './project-list.component';

const mockProjects = [
  {
    name: 'test',
    description: 'Description of the test project',
    language: 'JSON data',
    license: 'no license',
    link: 'https://www.google.com/',
    archived: false,
    stars: 2,
    watchers: 1,
    forks: 0
  }
];

describe('ProjectListComponent', () => {
  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));

  const mockProjectService = Mock.ofType<ProjectService>();
  mockProjectService
    .setup(x => x.getProjects())
    .returns(() => observableOf(mockProjects));

  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    mockTitleService.reset();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        LineSplittingPipe,
        ProjectsContainerComponent,
        ProjectListComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ProjectService,
          useFactory: () => mockProjectService.object
        },
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display blurb', () => {
    expect(compiled.querySelector('#projects-blurb p').textContent).toContain(
      'The computer at your desk. The phone in your pocket.'
    );
    expect(compiled.querySelector('#github-blurb h1').textContent).toContain(
      'GitHub'
    );
  });

  it('should change page title', () => {
    mockTitleService.verify(x => x.setTitle(It.isValue('Code')), Times.once());
    expect().nothing();
  });
});
