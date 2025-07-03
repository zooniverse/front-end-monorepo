import { Box } from 'grommet'
import { Add } from 'grommet-icons'
import IconActionButton from './IconActionButton'

export default {
  title: 'Components / Icon Action Button',
  component: IconActionButton,
  decorators: [
    (Story) => (
      <Box pad='medium'>
        <Story />
      </Box>
    )
  ]
};

export const Button = {
  args: {
    a11yTitle: 'Add',
    disabled: false,
    height: '40px',
    icon: <Add size='small' />,
    tip: true,
    width: '40px',
  }
}
