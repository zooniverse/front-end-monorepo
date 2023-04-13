import { Box } from 'grommet'
import MoveButton from './MoveButton'

const args = {
  active: false
}

export default {
  title: 'Image Toolbar / MoveButton',
  component: MoveButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  args
}

export function Default({ active, onClick }) {
  return (
    <Box width='72px' pad='12px'>
      <MoveButton active={active} onClick={onClick} />
    </Box>
  )
}
