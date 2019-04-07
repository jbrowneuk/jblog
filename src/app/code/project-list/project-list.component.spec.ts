import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { It, Mock, Times } from 'typemoq';

import { TitleService } from '../../shared/title.service';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';

// Classes under test
import { ProjectListComponent } from './project-list.component';

describe('ProjectListComponent', () => {
  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));

  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    mockTitleService.reset();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LineSplittingPipe, ProjectListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
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
