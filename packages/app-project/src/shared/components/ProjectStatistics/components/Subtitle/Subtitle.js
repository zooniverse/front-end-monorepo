import { Text } from 'grommet'
import { object, oneOfType, string } from 'prop-types'
import React from 'react'

function Subtitle ({ mode, text, ...props }) {
  return (
    <Text
      color={mode === 'light' ? 'black' : 'lightGrey'}
      {...props}
    >
      {text}
    </Text>
  )
}

Subtitle.propTypes = {
  margin: oneOfType([object, string]),
  mode: string,
  size: string,
  tag: string,
  text: string.isRequired,
  weight: string
}

Subtitle.defaultProps = {
  margin: 'none',
  size: 'small',
  tag: 'h5',
  weight: 'bold'
}

export default Subtitle
