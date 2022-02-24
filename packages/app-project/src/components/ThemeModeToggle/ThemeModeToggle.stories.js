import { Box, Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import ThemeModeToggle from './ThemeModeToggle'

export default {
  title: 'Project App / Shared / ThemeModeToggle',
  component: ThemeModeToggle,
  args: {
    dark: false
  },
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  }
}

export const Default = ({ dark, onClick, screenSize }) => {
  return (
    <Grommet
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      theme={{ ...zooTheme, dark }}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box pad='medium'>
        <ThemeModeToggle onClick={onClick} screenSize={screenSize} />
      </Box>
    </Grommet>
  )
}
