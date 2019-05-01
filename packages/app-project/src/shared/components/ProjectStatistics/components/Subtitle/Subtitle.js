import { ResponsiveContext, Text } from 'grommet'
import { object, oneOfType, string } from 'prop-types'
import React from 'react'

function Subtitle ({ margin, mode, text, ...props }) {
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Text {...props} margin={(size === 'small') ? { top: 'none', bottom: 'xsmall' } : margin}>
          {text}
        </Text>
      )}
    </ResponsiveContext.Consumer>
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

export default Subtitle
