import { addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

import backgrounds from './lib/backgrounds'

export const decorators = [
  (Story) => (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  )
]

export const parameters = {
  backgrounds: backgrounds.lightDefault,
  i18n,
  locale: 'en',
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
}
