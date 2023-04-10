import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import i18n from './lib/i18n'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

export const parameters = {
  i18n,
  layout: 'fullscreen',
  locale: 'en',
  locales: {
    en: 'English',
    test: 'Test Language'
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
}

export const globalTypes = {
  theme: {
    name: 'Grommet Theme',
    description: 'Global Grommet theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'arrowdown',
      items: ['light', 'dark'],
      showName: true,
    }
  }
}

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

export const decorators = [
  (Story, context) => {
    return (
      <Grommet
        background={background}
        theme={zooTheme}
        themeMode={context.globals.theme}
        full
      >
        <Story />
      </Grommet>
    )
  }
]
