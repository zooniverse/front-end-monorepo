import { addDecorator, addParameters, configure } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y';

import { backgrounds } from './lib'

addParameters({ backgrounds })
addDecorator(withA11y)

function loadStories() {
  const req = require.context('../src', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
