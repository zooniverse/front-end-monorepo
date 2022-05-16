import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import SpacedText from './SpacedText'

export default {
  title: 'Components / SpacedText',
  component: SpacedText,
  args: {
    children: 'Zooniverse Spaced Text',
    dark: false,
    size: 'medium',
    uppercase: true,
    weight: 'normal'
  },
  argTypes: {
    size: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: { type: 'select' }
    },
    uppercase: {
      options: [true, false],
      control: { type: 'radio' }
    },
    weight: {
      options: ['normal', 'bold'],
      control: { type: 'radio' }
    }
  }
}

export const Default = ({ children, dark, size, uppercase, weight }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Box pad='medium'>
      <SpacedText size={size} uppercase={uppercase} weight={weight}>
        {children}
      </SpacedText>
    </Box>
  </Grommet>
)
