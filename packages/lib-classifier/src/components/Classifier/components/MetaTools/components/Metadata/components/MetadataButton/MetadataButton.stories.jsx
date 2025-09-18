import { Box } from 'grommet'
import MetadataButton from './MetadataButton'

const args = {
  disabled: false
}

export default {
  title: 'Meta Tools / MetadataButton',
  component: MetadataButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  args
}

export function Default({ disabled, onClick }) {
  return (
    <Box pad='12px'>
      <MetadataButton disabled={disabled} onClick={onClick} />
    </Box>
  )
}
