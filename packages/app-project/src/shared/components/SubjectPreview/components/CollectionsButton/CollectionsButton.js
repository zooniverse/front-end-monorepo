import CollectionsModal from '@shared/components/CollectionsModal'
import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { array, bool, func, shape, string } from 'prop-types'
import React from 'react'
import CollectionsIcon from './CollectionsIcon'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function CollectionsButton (props) {
  const { disabled, onClick, subject } = props
  const collectionsModal = React.createRef()

  function addToCollections () {
    collectionsModal.current.wrappedInstance.open(subject.id)
    onClick()
  }

  return (
    <>
      <CollectionsModal
        ref={collectionsModal}
      />
      <MetaToolsButton
        disabled={disabled}
        icon={<CollectionsIcon color='dark-5' size='1em' />}
        text={counterpart('CollectionsButton.add')}
        onClick={addToCollections}
      />
    </>
  )
}

CollectionsButton.propTypes = {
  disabled: bool,
  onClick: func,
  subject: shape({
    favorite: bool,
    id: string,
    toggleFavourite: func,
    locations: array
  })
}

CollectionsButton.defaultProps = {
  disabled: false,
  onClick: () => false,
  subject: {
    favorite: false,
    id: '',
    toggleFavorite: () => false,
    locations: []
  }
}
