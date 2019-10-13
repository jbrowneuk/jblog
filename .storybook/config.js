import { configure } from '@storybook/angular';

function loadStories() {
  // automatically import all files ending in *.stories.ts
  const req = require.context('../src/app', true, /.stories.ts$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
