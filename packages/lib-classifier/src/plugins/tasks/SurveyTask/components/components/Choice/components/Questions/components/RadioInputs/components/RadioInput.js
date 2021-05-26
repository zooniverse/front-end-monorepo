import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

export default function RadioInput (props) {
  const {
    checked,
    label
  } = props

  const backgroundColor = checked ? 'accent-1' : 'neutral-6'

  return (
    <Box
      align='center'
      background={{ color: backgroundColor }}
      height='40px'
      justify='center'
      margin={{ bottom: 'xsmall' }}
      round='full'
      width='40px'
    >
      <Text
        color='dark-1'
        weight={checked ? 'bold' : 'normal'}
      >
        {label}
      </Text>
    </Box>
  )
}

RadioInput.defaultProps = {
  checked: false
}

RadioInput.propTypes = {
  checked: PropTypes.bool
}
