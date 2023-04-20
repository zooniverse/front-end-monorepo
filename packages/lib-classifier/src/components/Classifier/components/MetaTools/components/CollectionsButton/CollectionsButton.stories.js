import { Box } from 'grommet'
import CollectionsButton from './CollectionsButton'

const args = {
  disabled: false
}

export default {
  title: 'Meta Tools / CollectionsButton',
  component: CollectionsButton,
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
      <CollectionsButton disabled={disabled} onClick={onClick} />
    </Box>
  )
}
