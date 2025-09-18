import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import i18n from '@translations/i18n'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { StrictMode } from 'react'

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

const globalTypes = {
  theme: {
    name: 'Grommet Theme',
    description: 'Global Grommet theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'arrowdown',
      items: ['light', 'dark'],
      title: 'Grommet Theme',
    }
  }
}

const decorators = [
  (Story, context) => {
    return (
      <StrictMode>
        <Grommet
          background={background}
          theme={zooTheme}
          themeMode={context.globals.theme}
          full
        >
          <Story />
        </Grommet>
      </StrictMode>
    )
  }
]

const preview = {
  globals: {
    locale: 'en',
    locales: {
      en: 'English',
      test: 'Test Language'
    },
  },
  parameters: {
    i18n,
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  },
  decorators,
  globalTypes,
}

export default preview
