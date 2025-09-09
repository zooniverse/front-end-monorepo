import { bool, func } from 'prop-types'
import { Modal } from '@zooniverse/react-components'
import { useTranslation } from 'next-i18next'

function CollectionsModal ({
  active = false,
  children,
  closeFn
}) {
  const { t } = useTranslation('components')
  return (
    <Modal
      active={active}
      closeFn={closeFn}
      title={t('CollectionsModal.title')}
    >
      {children}
    </Modal>
  )
}

CollectionsModal.propTypes = {
  active: bool,
  closeFn: func.isRequired
}

export default CollectionsModal
