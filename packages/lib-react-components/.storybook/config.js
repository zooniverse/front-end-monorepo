import { configure } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { addDecorator } from '@storybook/react/dist/client/preview'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)

// This must be the first decorator or else it won't work
addDecorator(withInfo({ inline: true }))

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
