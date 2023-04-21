import { Box } from 'grommet'
import FullscreenButton from './FullscreenButton'

const args = {
  active: false,
  disabled: false
}

export default {
  title: 'Image Toolbar / FullscreenButton',
  component: FullscreenButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  args
}

export function Default({ active, disabled, onClick }) {
  return (
    <Box width='72px' pad='12px'>
      <FullscreenButton active={active} disabled={disabled} onClick={onClick} />
    </Box>
  )
}
