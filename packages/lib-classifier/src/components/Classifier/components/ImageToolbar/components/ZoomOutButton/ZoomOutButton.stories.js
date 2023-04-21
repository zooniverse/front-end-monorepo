import { Box } from 'grommet'
import ZoomOutButton from './ZoomOutButton'

export default {
  title: 'Image Toolbar / ZoomOutButton',
  component: ZoomOutButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  }
}

export function Default({ onClick }) {
  return (
    <Box width='72px' pad='12px'>
      <ZoomOutButton onClick={onClick} />
    </Box>
  )
}
