import { Modal } from '@zooniverse/react-components'
import { bool, func } from 'prop-types'
import { useTranslation } from 'next-i18next/pages'

import CollectionSettingsForm from './components/CollectionSettingsForm'

function CollectionSettingsModal({
  active = false,
  collection,
  collectionUrl,
  collaborators = [],
  onClose,
  onDelete,
  onRemoveCollaborator,
  onRoleChange,
  onSubmit
}) {
  const { t } = useTranslation('screens')
  const title = t('Collection.CollectionSettingsModal.title')

  return (
    <Modal
      active={active}
      closeFn={onClose}
      headingBackground='transparent'
      round='8px'
      title={title}
      titleColor={{ dark: 'neutral-6', light: 'black' }}
      width={{ width: '100%', max: '640px' }}
    >
      {active && (
        <CollectionSettingsForm
          collection={collection}
          collectionUrl={collectionUrl}
          collaborators={collaborators}
          onClose={onClose}
          onDelete={onDelete}
          onRemoveCollaborator={onRemoveCollaborator}
          onRoleChange={onRoleChange}
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  )
}

CollectionSettingsModal.propTypes = {
  active: bool,
  onClose: func
}

export default CollectionSettingsModal
