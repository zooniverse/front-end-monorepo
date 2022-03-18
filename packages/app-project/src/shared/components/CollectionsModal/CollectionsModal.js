import PropTypes from 'prop-types'
import { Modal } from '@zooniverse/react-components'
import { useTranslation } from 'next-i18next'

function CollectionsModal ({
  active,
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
  active: PropTypes.bool,
  closeFn: PropTypes.func.isRequired
}

CollectionsModal.defaultProps = {
  active: false
}

export default CollectionsModal
