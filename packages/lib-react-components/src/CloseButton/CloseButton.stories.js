import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'

import CloseButton from './CloseButton'

export default {
  title: 'Components/CloseButton',
  component: CloseButton,
  args: {
    dark: false
  }
}

export const Default = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Box align='center' height='small' justify='center' width='small'>
      <CloseButton closeFn={() => {}} />
    </Box>
  </Grommet>
)

export const WithTealBackground = ({ dark }) => (
  <Grommet theme={zooTheme} themeMode={dark ? 'dark' : 'light'}>
    <Box
      align='center'
      background='brand'
      height='small'
      justify='center'
      width='small'
    >
      <CloseButton color='neutral-6' closeFn={() => {}} />
    </Box>
  </Grommet>
)

export const Disabled = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Box align='center' height='small' justify='center' width='small'>
      <CloseButton disabled closeFn={() => {}} />
    </Box>
  </Grommet>
)
