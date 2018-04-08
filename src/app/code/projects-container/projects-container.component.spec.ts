import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { It, Mock } from 'typemoq';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { ProjectService } from '../project.service';

import { ProjectsContainerComponent } from './projects-container.component';

const mockProjects = [{
  'name': 'test',
  'title': 'A test project',
  'summary': 'Description of the test project',
  'info': 'JSON data',
  'link': 'https://www.google.com/',
  'resourcesUrl': 'http://localhost:4200/assets/images/'
}];

describe('ProjectsContainerComponent', () => {
  let component: ProjectsContainerComponent;
  let fixture: ComponentFixture<ProjectsContainerComponent>;
  let compiled: HTMLElement;

  const mockProjectService = Mock.ofType<ProjectService>();
  mockProjectService.setup(x => x.getProjects(It.isAnyNumber(), It.isAnyNumber()))
    .returns(() => Observable.of(mockProjects));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ LineSplittingPipe, ProjectsContainerComponent ],
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

  it('should display project title', () => {
    expect(compiled.querySelector('h2').textContent).toContain('A test project');
  });

  it('should display project information', () => {
    expect(compiled.querySelector('.card-info').textContent)
      .toContain('JSON data');
  });

  it('should display project information', () => {
    expect(compiled.querySelector('.post p').textContent)
      .toContain('Description of the test project');
  });

  it('should display project link', () => {
    expect(compiled.querySelector('#project-link').textContent)
      .toContain('Go to project page');
  });
});
