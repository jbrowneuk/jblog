import { addParameters, configure } from '@storybook/angular';

function loadStories() {
  // automatically import all files ending in *.stories.ts
  const req = require.context('../src/app', true, /.stories.ts$/);
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    storySort: (a, b) => a[1].id.localeCompare(b[1].id)
  }
});

configure(loadStories, module);
