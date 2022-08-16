import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import SpacedText from '../../../SpacedText'

export default function NarrowMenuNavListItem ({ color, text, overrideLang }) {
  const { i18n } = useTranslation()
  return (
    <SpacedText
      color={color}
      lang={overrideLang ? 'en' : i18n.language}
      size='xsmall'
      weight='bold'
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
