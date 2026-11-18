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
  const title = 'Collection Settings'

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
        <div>Collection settings go here.</div>
      )}
    </Modal>
  )
}

CollectionSettingsModal.propTypes = {
  active: bool,
  onClose: func
}

export default CollectionSettingsModal
