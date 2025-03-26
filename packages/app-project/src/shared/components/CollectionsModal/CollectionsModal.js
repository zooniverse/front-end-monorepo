import PropTypes from 'prop-types'
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
      trapFocus={true}
    >
      {children}
    </Modal>
  )
}

CollectionsModal.propTypes = {
  active: PropTypes.bool,
  closeFn: PropTypes.func.isRequired
}

export default CollectionsModal
