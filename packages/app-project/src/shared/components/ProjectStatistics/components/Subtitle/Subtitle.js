import { Text } from 'grommet'
import { string } from 'prop-types'
import React from 'react'

export default function Subtitle ({ text, ...props }) {
  return (
    <Text {...props}>
      {text}
    </Text>
  )
}

Subtitle.propTypes = {
  text: string.isRequired
}

Subtitle.defaultProps = {
  color: 'black',
  margin: 'none',
  size: 'small',
  tag: 'h5',
  weight: 'bold'
}
