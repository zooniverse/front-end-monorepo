import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import MetadataButton from './MetadataButton'

const args = {
  dark: false,
  disabled: false
}

export default {
  title: 'Meta Tools / MetadataButton',
  component: MetadataButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  args
}

export function Default({ dark, disabled, onClick }) {
  const theme = { ...zooTheme, dark }
  return (
    <Grommet
      background={{
        dark: 'dark-3',
        light: 'white'
      }}
      theme={theme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box pad='12px'>
        <MetadataButton disabled={disabled} onClick={onClick} />
      </Box>
    </Grommet>
  )
}
