import { Component, Input, NgModule } from '@angular/core';
import { storiesOf } from '@storybook/angular';

import { InsightsComponent } from './insights.component';

@Component({
  selector: 'jblog-image-container',
  template: `
    <div class="mock-images">
      <strong>{{ imageCount }}</strong>
      images from the album
      <strong>{{ albumName }}</strong>
    </div>
  `,
  styles: [
    '.mock-images{text-align:center;color:var(--color-secondary-foreground);}',
    '.mock-images::before{content:"("}',
    '.mock-images::after{content:")"}'
  ]
})
class MockImageContainerComponent {
  @Input() public albumName: string;
  @Input() public imageCount: number;
}

const moduleMetadata: NgModule = {
  declarations: [MockImageContainerComponent]
};

storiesOf('Gallery', module).add('Art Insights', () => ({
  component: InsightsComponent,
  moduleMetadata
}));
