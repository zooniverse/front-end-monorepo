import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import MetaToolsButton from '../MetaToolsButton'
import TalkIcon from './TalkIcon'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function TalkLink (props) {
  const { disabled, onClick } = props
  return (
    <MetaToolsButton
      disabled={disabled}
      icon={<TalkIcon color='dark-5' size='1em' />}
      text={counterpart('TalkLink.label')}
      onClick={onClick}
    />
  )
}

TalkLink.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

TalkLink.defaultProps = {
  disabled: false,
  onClick: () => false
}
