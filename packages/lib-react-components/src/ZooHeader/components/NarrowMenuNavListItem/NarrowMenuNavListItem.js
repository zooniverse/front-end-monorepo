import PropTypes from 'prop-types'

import SpacedText from '../../../SpacedText'

export default function NarrowMenuNavListItem ({ color = 'white', text, lang }) {
  return (
    <SpacedText
      color={color}
      lang={lang}
      size='xsmall'
      weight='bold'
    >
      {text}
    </SpacedText>
  )
}

NarrowMenuNavListItem.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired
}
