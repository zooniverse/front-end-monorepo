import React from 'react'
import PropTypes from 'prop-types'

import SpacedText from '../../../../../SpacedText'

export default function UserNavListItem ({ color, text }) {
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

UserNavListItem.defaultProps = {
  color: '#fff'
}

UserNavListItem.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired
}
