import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { IMock, It, Mock, Times } from 'typemoq';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { TitleService } from '../../shared/title.service';
// Classes under test
import { ProjectListComponent } from './project-list.component';

describe('ProjectListComponent', () => {
  let mockTitleService: IMock<TitleService>;

  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let pageObject: ProjectListObject;
  let compiled: HTMLElement;

  beforeEach(() => {
    mockTitleService = Mock.ofType<TitleService>();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LineSplittingPipe, ProjectListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    pageObject = new ProjectListObject(fixture);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display blurb', () => {
    expect(pageObject.projectBlurb).toBeTruthy();
    expect(pageObject.githubBlurb).toBeTruthy();
  });

  it('should change page title', () => {
    mockTitleService.verify(x => x.setTitle(It.isValue('Code')), Times.once());
    expect().nothing();
  });
});

class ProjectListObject extends PageObjectBase<ProjectListComponent> {
  get projectBlurb() {
    return this.select('#projects-blurb p');
  }

  get githubBlurb() {
    return this.select('#github-blurb h1');
  }
}
