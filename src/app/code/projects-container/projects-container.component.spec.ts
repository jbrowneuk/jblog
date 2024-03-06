import { MockPipe } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { Mock } from 'typemoq';

import { CommonModule, formatDate } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { ArchivedProjectFilterPipe } from './archive.pipe';
import { ProjectsContainerComponent } from './projects-container.component';

const mockProject: Project = {
  name: 'test',
  description: 'Description of the test project',
  language: 'JSON data',
  license: 'no license',
  link: 'https://www.google.com/',
  archived: false,
  stars: 0,
  watchers: 0,
  forks: 0,
  issues: 0,
  lastUpdated: new Date()
};

describe('ProjectsContainerComponent', () => {
  let component: ProjectsContainerComponent;
  let fixture: ComponentFixture<ProjectsContainerComponent>;
  let compiled: HTMLElement;
  let projectsSubject: BehaviorSubject<Project[]>;

  beforeEach(() => {
    projectsSubject = new BehaviorSubject([mockProject]);

    const mockProjectService = Mock.ofType<ProjectService>();
    mockProjectService
      .setup(x => x.getProjects())
      .returns(() => projectsSubject);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule, NoopAnimationsModule],
      declarations: [
        ProjectsContainerComponent,
        MockPipe(LineSplittingPipe),
        MockPipe(ArchivedProjectFilterPipe, data => data) // just return input for testing
      ],
      providers: [
        {
          provide: ProjectService,
          useFactory: () => mockProjectService.object
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsContainerComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // This set of tests uses a single project so that the data- selectors will always be correct for the test
  describe('Project details behaviour', () => {
    function getRenderedProjectProperty(prop: string): HTMLElement {
      const selector = `[data-project-${prop}]`;
      return compiled.querySelector(selector) as HTMLElement;
    }

    it('should display project language', () => {
      const rendered = getRenderedProjectProperty('language');
      expect(rendered.textContent?.trim()).toBe(mockProject.language);
    });

    it('should display project license', () => {
      const rendered = getRenderedProjectProperty('license');
      expect(rendered.textContent?.trim()).toBe(mockProject.license);
    });

    it('should display project link', () => {
      const element = compiled.querySelector('[data-project-link]') as Element;
      expect(element).toBeTruthy();
    });

    it('should display last updated', () => {
      const editedProject = { ...mockProject, lastUpdated: new Date() };
      projectsSubject.next([editedProject]);
      fixture.detectChanges();

      const rendered = getRenderedProjectProperty('last-updated');
      expect(rendered).toBeTruthy();

      // Convert date/time using test runner’s timeZone
      const currentLocale = TestBed.inject(LOCALE_ID);
      const expectedDateValue = formatDate(
        editedProject.lastUpdated,
        'mediumDate',
        currentLocale
      );

      expect(rendered.textContent?.trim()).toContain(expectedDateValue);
    });

    // Watchers, stars and forks use the same logic so dynamically generate tests
    ['watchers', 'stars', 'forks'].forEach(property => {
      describe(`${property} behaviour`, () => {
        it('should display if more than zero', () => {
          const editedProject = { ...mockProject, [property]: 1024 };
          projectsSubject.next([editedProject]);
          fixture.detectChanges();

          const rendered = getRenderedProjectProperty(property);
          expect(rendered).toBeTruthy();

          const expectedValue = `${(editedProject as any)[property]}`; // `as any` needed for dynamic propert accessor
          expect(rendered.textContent?.trim()).toBe(expectedValue);
        });

        it('should not display if zero', () => {
          const editedProject = { ...mockProject, [property]: 0 };
          projectsSubject.next([editedProject]);
          fixture.detectChanges();

          const rendered = getRenderedProjectProperty(property);
          expect(rendered).toBeFalsy();
        });
      });
    });
  });
});
