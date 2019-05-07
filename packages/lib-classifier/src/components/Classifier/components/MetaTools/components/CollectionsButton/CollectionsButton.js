import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import MetaToolsButton from '../MetaToolsButton'
import CollectionsIcon from './CollectionsIcon'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export const Collect = styled(CollectionsIcon)`
  width: 1em;
`

export default function CollectionsButton (props) {
  const { disabled, onClick } = props
  return (
    <MetaToolsButton
      disabled={disabled}
      icon={<Collect color='dark-5' />}
      margin={{ vertical: '5px', horizontal: 'none' }}
      text={counterpart('CollectionsButton.add')}
      onClick={onClick}
    />
  )
}

CollectionsButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

CollectionsButton.defaultProps = {
  disabled: false,
  onClick: () => false
}
