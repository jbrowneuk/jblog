import { addParameters, configure } from '@storybook/angular';

function loadStories() {
  // Import design stories
  require('../src/design');

  // automatically import all files ending in *.stories.ts
  const req = require.context('../src/app', true, /.stories.ts$/);
  req.keys().forEach(filename => req(filename));
}

const defaultRoot = 'Components';
const guidelinesRoot = 'Guidelines';

function sortFn(a, b) {
  const aRep = a[1];
  const bRep = b[1];

  // Rename kind to contain global root
  if (!aRep.kind.includes('|')) {
    aRep.kind = `${defaultRoot}|${aRep.kind}`;
  }

  if (!bRep.kind.includes('|')) {
    bRep.kind = `${defaultRoot}|${bRep.kind}`;
  }

  if (
    aRep.kind.includes(guidelinesRoot) &&
    !bRep.kind.includes(guidelinesRoot)
  ) {
    return -1;
  }

  return aRep.id.localeCompare(bRep.id);
}

addParameters({ options: { storySort: sortFn } });

configure(loadStories, module);
