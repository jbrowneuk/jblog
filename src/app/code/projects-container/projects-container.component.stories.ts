import { of } from 'rxjs';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner.component';
import { ProjectService } from '../project.service';
import { ArchivedProjectFilterPipe } from './archive.pipe';
import { ProjectsContainerComponent } from './projects-container.component';

const mockProject = {
  name: 'My project',
  archived: false,
  language: 'JavaScript',
  license: 'MIT',
  watchers: 30,
  stars: 20,
  forks: 10,
  link: '.'
};

const mockArchivedProject = {
  name: 'My archived project',
  archived: true,
  language: 'JavaScript',
  license: 'MIT',
  watchers: 10,
  stars: 5,
  forks: 2,
  link: '.'
};

const mockProjectData = [
  mockProject,
  mockArchivedProject,
  mockProject,
  mockArchivedProject
];

const mockProjectService = {
  getProjects: () => of(mockProjectData)
};

const moduleMetadata: NgModule = {
  imports: [BrowserAnimationsModule],
  declarations: [
    ArchivedProjectFilterPipe,
    LoadSpinnerComponent,
    ProjectsContainerComponent
  ],
  providers: [{ provide: ProjectService, useValue: mockProjectService }]
};

storiesOf('Code Projects', module)
  .addDecorator(withKnobs)
  .add('Projects container', () => ({
    template: `<div class="container">
    <jblog-projects-container [showArchived]="showArchived">
    </jblog-projects-container></div>`,
    moduleMetadata,
    props: {
      showArchived: boolean('showArchived', false)
    }
  }));
