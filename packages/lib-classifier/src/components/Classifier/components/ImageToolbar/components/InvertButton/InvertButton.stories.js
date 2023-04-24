import { Box } from 'grommet'

import InvertButton from './InvertButton'

const args = {
  active: false
}

export default {
  title: 'Image Toolbar / InvertButton',
  component: InvertButton,
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
      <InvertButton active={active} onClick={onClick} />
    </Box>
  )
}
