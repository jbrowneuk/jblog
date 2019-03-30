import { of as observableOf, Observable } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { It, Mock } from 'typemoq';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { ProjectService } from '../project.service';

import { ProjectsContainerComponent } from './projects-container.component';

const mockProject = {
  name: 'test',
  description: 'Description of the test project',
  language: 'JSON data',
  license: 'no license',
  link: 'https://www.google.com/',
  archived: false,
  stars: 2,
  watchers: 1,
  forks: 0
};

const mockProjects = [mockProject];

describe('ProjectsContainerComponent', () => {
  let component: ProjectsContainerComponent;
  let fixture: ComponentFixture<ProjectsContainerComponent>;
  let compiled: HTMLElement;

  const mockProjectService = Mock.ofType<ProjectService>();
  mockProjectService
    .setup(x => x.getProjects())
    .returns(() => observableOf(mockProjects));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LineSplittingPipe, ProjectsContainerComponent],
      providers: [
        { provide: ProjectService, useFactory: () => mockProjectService.object }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsContainerComponent);
    component = fixture.componentInstance;
    component.projects = mockProjects;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function checkEquality(property: string): void {
    const element = compiled.querySelector(`[data-test=${property}]`);
    expect(element.textContent).toContain(mockProject[property]);
  }

  it('should display project name', () => {
    checkEquality('name');
  });

  it('should display project information', () => {
    checkEquality('language');
  });

  it('should display project information', () => {
    checkEquality('description');
  });

  it('should display project link', () => {
    expect(compiled.querySelector('[data-test=link]').textContent).toContain(
      'Go to project page'
    );
  });
});
