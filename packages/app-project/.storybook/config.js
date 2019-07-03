import { addParameters, configure } from '@storybook/react'

import { backgrounds } from './lib'

addParameters({ backgrounds })

function loadStories() {
  const req = require.context('../src', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
