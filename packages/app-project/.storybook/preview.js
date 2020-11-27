import { addDecorator, addParameters } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { backgrounds } from './lib'

addParameters({
  backgrounds: {
    values: backgrounds.lightDefault
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
})
addDecorator(withA11y)
