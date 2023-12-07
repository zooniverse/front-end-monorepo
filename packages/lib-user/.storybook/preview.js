import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { StrictMode } from 'react'

const background = {
  dark: 'dark-3',
  light: 'neutral-6'
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
          <Box pad='large'>
            <Story />
          </Box>
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
}

export default preview
