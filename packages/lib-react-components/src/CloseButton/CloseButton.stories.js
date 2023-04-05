import { Box } from 'grommet'

import CloseButton from './CloseButton'
import readme from './README.md'

export default {
  title: 'Components/CloseButton',
  component: CloseButton,
  args: {
    closeFn: () => true
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = ({ closeFn }) => (
  <Box align='center' height='small' justify='center' width='small'>
    <CloseButton closeFn={closeFn} />
  </Box>
)

export const WithTealBackground = ({ closeFn }) => (
  <Box
    align='center'
    background='brand'
    height='small'
    justify='center'
    width='small'
  >
    <CloseButton color='neutral-6' closeFn={closeFn} />
  </Box>
)

export const Disabled = ({ closeFn }) => (
  <Box align='center' height='small' justify='center' width='small'>
    <CloseButton disabled closeFn={closeFn} />
  </Box>
)
