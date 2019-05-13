import React from 'react'
import PropTypes from 'prop-types'
import counterpart from 'counterpart'
import styled from 'styled-components'
import MetaToolsButton from '../../../MetaToolsButton'

import InfoIcon from './InfoIcon'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export const StyledInfoIcon = styled(InfoIcon)`
  width: 1em;
`

export default function MetadataButton (props) {
  const { className, disabled, onClick } = props
  return (
    <MetaToolsButton
      disabled={disabled}
      icon={<StyledInfoIcon className={className} color='dark-5' />}
      text={counterpart('MetadataButton.label')}
      onClick={onClick}
      {...props}
    />
  )
}

MetadataButton.defaultProps = {
  className: '',
  disabled: false
}

MetadataButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}
