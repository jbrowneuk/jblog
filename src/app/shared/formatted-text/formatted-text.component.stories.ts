import { NgxMdModule } from 'ngx-md';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { FormattedTextComponent } from './formatted-text.component';

const moduleMetadata: NgModule = {
  declarations: [FormattedTextComponent],
  imports: [HttpClientModule, NgxMdModule.forRoot()]
};

const markdown = `# Markdown-enabled formatted text

To preview the behaviour:

1. Switch to the knobs tab in the addons area (press A if the addons area is not visible)
1. Edit the text field`;

storiesOf('Shared', module).add('Formatted text', () => ({
  template: `<jblog-text>{{ text }}</jblog-text>`,
  moduleMetadata,
  props: {
    text: text('text', markdown)
  }
}));
