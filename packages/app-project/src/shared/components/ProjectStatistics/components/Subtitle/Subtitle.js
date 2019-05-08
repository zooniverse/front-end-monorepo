import { Text } from 'grommet'
import { withResponsiveContext } from '@zooniverse/react-components'
import { object, oneOfType, string } from 'prop-types'
import React from 'react'

function Subtitle ({ margin, mode, screenSize, text, ...props }) {
  return (
    <Text {...props} margin={(screenSize === 'small') ? { top: 'none', bottom: 'xsmall' } : margin}>
      {text}
    </Text>
  )
}

Subtitle.propTypes = {
  margin: oneOfType([object, string]),
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

export default withResponsiveContext(Subtitle)
