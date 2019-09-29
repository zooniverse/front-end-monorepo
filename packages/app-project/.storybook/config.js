import { addDecorator, addParameters, configure } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { backgrounds } from './lib'

addParameters({
  backgrounds,
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
})
addDecorator(withA11y)

function loadStories() {
  const req = require.context('../src', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
