import { Box } from 'grommet'
import AnnotateButton from './AnnotateButton'

const args = {
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

export function Default({ active, onClick }) {
  return (
    <Box width='72px'>
      <Box pad='12px'>
        <AnnotateButton active={active} onClick={onClick} />
      </Box>
    </Box>
  )
}
