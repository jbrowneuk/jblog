import { MockPipe } from 'ng-mocks';
import { take } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageObjectBase } from '../../lib/testing/page-object.base';
import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { TitleService } from '../../shared/title.service';
import { ProjectListComponent } from './project-list.component';

describe('ProjectListComponent', () => {
  let mockTitleService: IMock<TitleService>;
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let pageObject: ProjectListObject;

  beforeEach(() => {
    mockTitleService = Mock.ofType<TitleService>();

    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [MockPipe(LineSplittingPipe), ProjectListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    pageObject = new ProjectListObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display blurb', () => {
    expect(pageObject.projectBlurb).toBeTruthy();
    expect(pageObject.githubBlurb).toBeTruthy();
  });

  it('should change page title when initialised', () => {
    mockTitleService.verify(x => x.setTitle(It.isValue('Code')), Times.once());
  });

  describe('Archive visibility', () => {
    it('should set archive visibility on setArchiveVisible', done => {
      const values: boolean[] = [];

      // take(2) here takes the initial value (it's a BehaviorSubject) and the first emitted after that
      component.archiveVisible$.pipe(take(2)).subscribe({
        next: value => {
          values.push(value);

          if (values.length === 2) {
            expect(values).toEqual([false, true]);
            done();
          }
        }
      });

      component.setArchiveVisible(!component.archiveVisible$.value);
    });

    // it('should not set archive visibility if set to the same value', done => {});
  });
});

class ProjectListObject extends PageObjectBase<ProjectListComponent> {
  get projectBlurb() {
    return this.selectByDataAttribute('project-blurb');
  }

  get githubBlurb() {
    return this.selectByDataAttribute('github-blurb');
  }
}
