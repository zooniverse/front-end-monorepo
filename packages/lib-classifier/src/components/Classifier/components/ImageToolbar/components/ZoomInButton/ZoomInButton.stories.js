import { Box } from 'grommet'
import ZoomInButton from './ZoomInButton'

export default {
  title: 'Image Toolbar / ZoomInButton',
  component: ZoomInButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  }
}

export function Default({ onClick }) {
  return (
    <Box width='72px' pad='12px'>
      <ZoomInButton onClick={onClick} />
    </Box>
  )
}
