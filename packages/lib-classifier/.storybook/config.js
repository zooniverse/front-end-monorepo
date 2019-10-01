import { addDecorator, addParameters, configure } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import backgrounds from './lib/backgrounds'

addParameters({
  backgrounds: backgrounds.lightDefault,
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
})
addDecorator(withA11y)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);