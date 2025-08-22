import CollectionsModal from '@shared/components/CollectionsModal'
import { MetaToolsButton } from '@zooniverse/react-components'
import { array, bool, func, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import CollectionsIcon from './CollectionsIcon'

export default function CollectionsButton({ disabled, onClick, subject }) {
  const { t } = useTranslation('components')

  const [collectionsModalActive, setCollectionsModalActive] = useState(false)
  const addToCollections = () => {
    onClick()
    setCollectionsModalActive(true)
  }

  return (
    <>
      <CollectionsModal
        collectionsModalActive={collectionsModalActive}
        setCollectionsModalActive={setCollectionsModalActive}
        subjectID={subject.id}
      />
      <MetaToolsButton
        data-testid="subject-collections-button"
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
