import CollectionsModal from '@shared/components/CollectionsModal'
import { MetaToolsButton } from '@zooniverse/react-components'
import { array, bool, func, shape, string } from 'prop-types'
import { createRef } from 'react'
import { useTranslation } from 'next-i18next'

import CollectionsIcon from './CollectionsIcon'

export default function CollectionsButton (props) {
  const { t } = useTranslation('components')
  const { disabled, onClick, subject } = props
  const collectionsModal = createRef()

  function addToCollections () {
    collectionsModal.current.open(subject.id)
    onClick()
  }

  return (
    <>
      <CollectionsModal
        ref={collectionsModal}
      />
      <MetaToolsButton
        disabled={disabled}
        icon={<CollectionsIcon color='dark-5' size='15px' />}
        text={t('SubjectPreview.CollectionsButton.add')}
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
