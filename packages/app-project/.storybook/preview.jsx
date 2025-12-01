import { initialize, mswLoader } from 'msw-storybook-addon'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'
import i18n from './lib/i18n'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

// Initialize MSW
initialize({
  serviceWorker: {
    url: './mockServiceWorker.js'
  },
  onUnhandledRequest: 'bypass'
})

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
  initialGlobals: {
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
  },
  loaders: [mswLoader]
}

export default preview
