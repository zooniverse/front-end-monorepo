import { Box } from 'grommet'

import InvertButton from './InvertButton'

const args = {
  active: false,
  disabled: false,
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

export function Default({ active, disabled, onClick }) {
  return (
    <Box width='72px' pad='12px'>
      <InvertButton
        active={active}
        disabled={disabled}
        onClick={onClick}
      />
    </Box>
  )
}
