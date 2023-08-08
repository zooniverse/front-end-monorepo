import { Box } from 'grommet'
import ZoomInButton from './ZoomInButton'

const args = {
  disabled: false
}

export default {
  title: 'Image Toolbar / ZoomInButton',
  component: ZoomInButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  args
}

export function Default({ disabled, onClick }) {
  return (
    <Box width='72px' pad='12px'>
      <ZoomInButton disabled={disabled} onClick={onClick} />
    </Box>
  )
}
