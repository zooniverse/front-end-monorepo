import { configure } from '@storybook/react'
import { setDefaults } from '@storybook/addon-info'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)

// addon-info
setDefaults({
  inline: true
})

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
