import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

function Subtitle ({ text, ...props }) {
  return (
    <Text {...props}>
      {text}
    </Text>
  )
}

Subtitle.defaultProps = {
  color: 'black',
  margin: 'none',
  size: 'small',
  tag: 'h5',
  weight: 'bold'
}

export default Subtitle
