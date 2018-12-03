import React from 'react'
import PropTypes from 'prop-types'
import counterpart from 'counterpart'
import styled from 'styled-components'
import { Button } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'

import InfoIcon from './InfoIcon'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledInfoIcon = styled(InfoIcon)`
  width: 1em;
`

export default function MetadataButton (props) {
  const { onClick } = props
  return (
    <Button
      icon={<StyledInfoIcon color='#5C5C5C' />}
      label={<SpacedText>{counterpart('MetadataButton.label')}</SpacedText>}
      plain={true}
      onClick={onClick}
    />
  )
}
