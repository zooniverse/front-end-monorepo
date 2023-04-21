import { Box } from 'grommet'
import RotateButton from './RotateButton'

const args = {
  dark: false,
  disabled: false
}

export default {
  title: 'Image Toolbar / RotateButton',
  component: RotateButton,
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
      <RotateButton disabled={disabled} onClick={onClick} />
    </Box>
  )
}
