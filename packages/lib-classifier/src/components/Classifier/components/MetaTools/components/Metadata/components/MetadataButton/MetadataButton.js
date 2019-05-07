import React from 'react'
import PropTypes from 'prop-types'
import counterpart from 'counterpart'
import styled from 'styled-components'
import MetaToolsButton from '../../../MetaToolsButton'

import InfoIcon from './InfoIcon'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledInfoIcon = styled(InfoIcon)`
  width: 1em;
`

export default function MetadataButton (props) {
  const { disabled, onClick } = props
  return (
    <MetaToolsButton
      disabled={disabled}
      icon={<StyledInfoIcon color='dark-5' />}
      margin={{ vertical: '5px', horizontal: 'none' }}
      text={counterpart('MetadataButton.label')}
      onClick={onClick}
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
