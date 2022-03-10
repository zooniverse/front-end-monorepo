import { addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import i18n from './i18n'

import backgrounds from './lib/backgrounds'

export const parameters = {
  backgrounds: backgrounds.lightDefault,
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    test: 'Test Language'
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
}
