import { Box } from 'grommet'
import ResetButton from './ResetButton'

const args = {
  disabled: false
}

export default {
  title: 'Image Toolbar / ResetButton',
  component: ResetButton,
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
      <ResetButton disabled={disabled} onClick={onClick} />
    </Box>
  )
}
