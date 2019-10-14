import { MetaToolsButton } from '@zooniverse/react-components'
import React from 'react'
import PropTypes from 'prop-types'
import counterpart from 'counterpart'

import InfoIcon from './InfoIcon'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function MetadataButton (props) {
  const { disabled, onClick } = props
  return (
    <MetaToolsButton
      disabled={disabled}
      icon={<InfoIcon color='dark-5' size='1em' />}
      text={counterpart('MetadataButton.label')}
      onClick={onClick}
      {...props}
    />
  )
}

MetadataButton.defaultProps = {
  disabled: false
}

MetadataButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}
