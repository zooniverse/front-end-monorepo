import { INITIAL_VIEWPORTS } from 'storybook/viewport'
import i18n from '../src/translations/i18n'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

const globalTypes = {
  theme: {
    name: 'Grommet Theme',
    description: 'Global Grommet theme for components',
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

const preview = {
  globals: {
    locale: 'en',
    locales: {
      en: 'English',
      test: 'Test Language'
    },
    theme: 'light'
  },
  parameters: {
    i18n,
    layout: 'fullscreen',
    viewport: {
      options: INITIAL_VIEWPORTS
    }
  },
  decorators,
  globalTypes,
}

export default preview
