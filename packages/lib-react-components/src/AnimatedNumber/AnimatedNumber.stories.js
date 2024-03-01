import { Box } from 'grommet'
import AnimatedNumber from './AnimatedNumber'

export default {
  title: 'Components / AnimatedNumber',
  component: AnimatedNumber
}

export const Default = {
  args: {
    duration: 1000,
    value: 123456
  }
}

export const ScrollDown = () => {
  return (
    <Box pad={{ vertical: '120vh' }}>
      <AnimatedNumber duration={4000} value={700000000} />
    </Box>
  )
}
