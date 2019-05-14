import { Text } from 'grommet'
import { withResponsiveContext } from '@zooniverse/react-components'
import { object, oneOfType, string } from 'prop-types'
import React from 'react'

function Subtitle ({ margin, mode, screenSize, text, ...props }) {
  const textMargin = (screenSize === 'small') ? { top: 'none', bottom: 'xsmall' } : margin
  return (
    <Text {...props} margin={textMargin}>
      {text}
    </Text>
  )
}

Subtitle.propTypes = {
  margin: oneOfType([object, string]),
  screenSize: string,
  size: string,
  tag: string,
  text: string.isRequired,
  weight: string
}

Subtitle.defaultProps = {
  margin: 'none',
  screenSize: '',
  size: 'small',
  tag: 'h3',
  weight: 'bold'
}

export default withResponsiveContext(Subtitle)
export { Subtitle }
