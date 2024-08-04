import { Box } from 'grommet'
import { useState } from 'react'

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

export const UpdateTheValue = () => {
  const [value, setValue] = useState(10)

  function handleClick() {
    const newValue = value + 1
    setValue(newValue)
  }

  return (
    <Box width='200px' gap='xsmall'>
      <AnimatedNumber value={value} />
      <button onClick={handleClick}>Update the value</button>
    </Box>
  )
}

export const Zero = {
  args: {
    value: 0
  }
}

export const ScrollDown = () => {
  return (
    <Box pad={{ vertical: '120vh' }}>
      <AnimatedNumber duration={4000} value={700000000} />
    </Box>
  )
}

export const DeferredAnimation = () => {
  const [value, setValue] = useState(0)
  setTimeout(() => setValue(700000000), 2000)
  return (
    <Box pad={{ vertical: '120vh' }}>
      <AnimatedNumber value={value} />
    </Box>
  )
}
