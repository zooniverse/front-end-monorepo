import { MetaToolsButton } from '@zooniverse/react-components'
import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import InfoIcon from './InfoIcon'

export default function MetadataButton (props) {
  const { t } = useTranslation('components')
  const { disabled, onClick } = props
  return (
    <MetaToolsButton
      disabled={disabled}
      icon={<InfoIcon color='dark-5' size='15px' />}
      text={t('MetaTools.MetadataButton.label')}
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
