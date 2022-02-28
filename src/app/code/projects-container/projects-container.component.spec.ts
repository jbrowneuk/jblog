import { of as observableOf } from 'rxjs';
import { Mock } from 'typemoq';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

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

@Pipe({
  name: 'archivedProjects'
})
class MockFilterPipe implements PipeTransform {
  transform(val: any) {
    return val;
  }
}

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
      declarations: [
        LineSplittingPipe,
        ProjectsContainerComponent,
        MockFilterPipe
      ],
      providers: [
        {
          provide: ProjectService,
          useFactory: () => mockProjectService.object
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsContainerComponent);
    component = fixture.componentInstance;
    component.projects = mockProjects;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function checkEquality(property: string, value: string): void {
    const element = compiled.querySelector(
      `[data-test=${property}]`
    ) as Element;
    expect(`${element.textContent}`).toContain(value);
  }

  it('should display project name', () => {
    checkEquality('name', mockProject.name);
  });

  it('should display project information', () => {
    checkEquality('language', mockProject.language);
  });

  it('should display project information', () => {
    checkEquality('description', mockProject.description);
  });

  it('should display project link', () => {
    const element = compiled.querySelector('[data-test=link]') as Element;
    expect(element.textContent).toContain('Go to project page');
  });
});
