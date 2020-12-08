import { addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import backgrounds from './lib/backgrounds'

export const parameters = {
  backgrounds: backgrounds.lightDefault,
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
}
