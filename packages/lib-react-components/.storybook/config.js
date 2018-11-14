import { configure } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withBackgrounds } from '@storybook/addon-backgrounds'
import { withViewport } from '@storybook/addon-viewport'
import { addDecorator } from '@storybook/react/dist/client/preview'
import { backgrounds } from '../stories/lib'
// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)

// This must be the first decorator or else it won't work
addDecorator(withInfo({ inline: true }))
addDecorator(withBackgrounds(backgrounds))
addDecorator(withViewport())

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
