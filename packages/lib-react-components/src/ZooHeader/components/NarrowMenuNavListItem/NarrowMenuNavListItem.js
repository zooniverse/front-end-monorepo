import React from 'react'
import PropTypes from 'prop-types'

import SpacedText from '../../../SpacedText'

export default function NarrowMenuNavListItem ({ color, text }) {
  return (
    <SpacedText
      color={color}
      weight='bold'
      size='xsmall'
    >
      {text}
    </SpacedText>
  )
}

NarrowMenuNavListItem.defaultProps = {
  color: 'white'
}

NarrowMenuNavListItem.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired
}
