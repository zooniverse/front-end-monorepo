import React from 'react'
import PropTypes from 'prop-types'
import counterpart from 'counterpart'
import styled from 'styled-components'
import { PlainButton } from '@zooniverse/react-components'

import InfoIcon from './InfoIcon'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledInfoIcon = styled(InfoIcon)`
  width: 1em;
`

export default function MetadataButton (props) {
  const { disabled, onClick } = props
  return (
    <PlainButton
      disabled={disabled}
      icon={<StyledInfoIcon color='#5C5C5C' />}
      margin={{ vertical: '5px', horizontal: 'none' }}
      text={counterpart('MetadataButton.label')}
      onClick={onClick}
    />
  )
}

MetadataButton.defaultProps = {
  disabled: false,
}

MetadataButton.propTypes = {
  disabled: PropTypes.bool, 
  onClick: PropTypes.func
}
