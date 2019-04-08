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
  const { onClick } = props
  return (
    <PlainButton
      icon={<StyledInfoIcon color='#5C5C5C' />}
      text={counterpart('MetadataButton.label')}
      onClick={onClick}
    />
  )
}

MetadataButton.propTypes = {
  onClick: PropTypes.func
}
