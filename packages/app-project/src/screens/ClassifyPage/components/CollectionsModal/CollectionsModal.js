import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import { Modal } from '@zooniverse/react-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function CollectionsModal ({
  active,
  children,
  closeFn
}) {
  return (
    <Modal
      active={active}
      closeFn={closeFn}
      title={counterpart('CollectionsModal.title')}
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
