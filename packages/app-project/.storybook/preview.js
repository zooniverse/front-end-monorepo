import { addParameters } from '@storybook/react'
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
