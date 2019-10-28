import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import CollectionsIcon from './CollectionsIcon'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function CollectionsButton (props) {
  const { disabled, onClick } = props
  return (
    <MetaToolsButton
      disabled={disabled}
      icon={<CollectionsIcon color='dark-5' size='1em' />}
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
