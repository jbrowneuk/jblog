import { Component, Input, NgModule } from '@angular/core';
import { storiesOf } from '@storybook/angular';

import { TitleService } from '../../shared/title.service';
import { ProjectListComponent } from './project-list.component';

const mockTitleService = {
  resetTitle: () => {},
  setTitle: () => {}
};

@Component({
  selector: 'jblog-projects-container',
  template: `
    <div class="emulated-ng-content">
      Projects list. Archived projects are
      {{ showArchived ? 'visible' : 'hidden' }}.
    </div>
  `,
  styles: ['div{margin-bottom:56px}']
})
class MockProjectContainerComponent {
  @Input() public showArchived: false;
}

const moduleMetadata: NgModule = {
  declarations: [MockProjectContainerComponent],
  providers: [{ provide: TitleService, useValue: mockTitleService }]
};

storiesOf('Code Projects', module).add('Projects page', () => ({
  component: ProjectListComponent,
  moduleMetadata,
  props: {}
}));
