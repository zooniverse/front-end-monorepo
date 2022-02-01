import { addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import i18n from '@translations/i18n'

import backgrounds from './lib/backgrounds'

export const parameters = {
  backgrounds: backgrounds.lightDefault,
  i18n,
  locale: 'en',
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
}
