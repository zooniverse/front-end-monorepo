import { addParameters, configure } from '@storybook/react';

import { backgrounds } from './lib'

addParameters({ backgrounds })

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
