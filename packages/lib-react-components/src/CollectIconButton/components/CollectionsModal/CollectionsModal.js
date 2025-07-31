import { bool, func } from 'prop-types'
import Modal from '../../../Modal'

import { useTranslation } from '../../../translations/i18n'

function CollectionsModal ({
  active = false,
  children,
  closeFn
}) {
  const { t } = useTranslation()
  
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
