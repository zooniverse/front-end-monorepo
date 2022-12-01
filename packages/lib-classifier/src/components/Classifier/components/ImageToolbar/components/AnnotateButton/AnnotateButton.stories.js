import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import AnnotateButton from './AnnotateButton'

const args = {
  dark: false,
  active: false
}

export default {
  title: 'Image Toolbar / AnnotateButton',
  component: AnnotateButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  args
}

export function Default({ dark, active, onClick }) {
  const theme = { ...zooTheme, dark }
  return (
    <Box width='72px'>
      <Grommet
        background={{
          dark: 'dark-3',
          light: 'white'
        }}
        theme={theme}
        themeMode={dark ? 'dark' : 'light'}
      >
        <Box pad='12px'>
          <AnnotateButton active={active} onClick={onClick} />
        </Box>
      </Grommet>
    </Box>
  )
}
