import { INITIAL_VIEWPORTS } from 'storybook/viewport'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import i18n from '../src/translations/i18n'

const background = {
  dark: 'dark-1',
  light: 'light-1'
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
  docs: {
    tags: ['autodocs']
  },
  initialGlobals: {
    locale: 'en',
    locales: {
      en: 'English'
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
  globalTypes: {
    theme: {
      name: 'Grommet Theme',
      description: 'Global Grommet theme for components',
      toolbar: {
        icon: 'arrowdown',
        items: ['light', 'dark'],
        title: 'Grommet Theme'
      }
    }
  }
}

export default preview
