import { withBackgrounds } from '@storybook/addon-backgrounds'
import { withInfo } from '@storybook/addon-info'
import { withNotes } from '@storybook/addon-notes'
import { withViewport } from '@storybook/addon-viewport'
import { configure } from '@storybook/react'
import { addDecorator } from '@storybook/react/dist/client/preview'

import { backgrounds } from './lib'

// const storyDir = require.context('../stories', true, /.stories.js$/)
const componentDirs = require.context('../src', true, /.stories.js$/)

addDecorator(withBackgrounds(backgrounds))
addDecorator(withViewport())
addDecorator(withNotes)

function loadStories (context) {
  context.keys().forEach(filename => context(filename))
}

// configure(loadStories.bind(this, storyDir), module)
configure(loadStories.bind(this, componentDirs), module)
