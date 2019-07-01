import { withBackgrounds } from '@storybook/addon-backgrounds'
import { withNotes } from '@storybook/addon-notes'
import { withViewport } from '@storybook/addon-viewport'
import { configure } from '@storybook/react'
import { addDecorator } from '@storybook/react/dist/client/preview'

import { backgrounds } from './lib'

const componentDirs = require.context('../src', true, /.stories.js$/)

addDecorator(withBackgrounds(backgrounds))
addDecorator(withViewport())
addDecorator(withNotes)

configure(loadStories.bind(this, componentDirs), module)

function loadStories (context) {
  context.keys().forEach(filename => context(filename))
}
