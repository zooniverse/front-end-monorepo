import { Box } from 'grommet'
import ZoomOutButton from './ZoomOutButton'

const args = {
  disabled: false
}

export default {
  title: 'Image Toolbar / ZoomOutButton',
  component: ZoomOutButton,
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
      <ZoomOutButton disabled={disabled} onClick={onClick} />
    </Box>
  )
}
