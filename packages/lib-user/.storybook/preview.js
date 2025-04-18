import { initialize, mswLoader } from 'msw-storybook-addon'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { StrictMode } from 'react'

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

// Initialize MSW
initialize({
  serviceWorker: {
    url: './mockServiceWorker.js',
  },
  onUnhandledRequest: 'bypass',
})

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
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  },
  decorators,
  globalTypes,
  loaders: [mswLoader]
}

export default preview
