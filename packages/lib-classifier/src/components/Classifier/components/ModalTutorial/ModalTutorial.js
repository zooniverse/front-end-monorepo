import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContext } from 'grommet'
import { Modal } from '@zooniverse/react-components'
import asyncStates from '@zooniverse/async-states'
import { useTranslation } from 'react-i18next'

import { withStores } from '@helpers'
import SlideTutorial from '../SlideTutorial'

function storeMapper (classifierStore) {
  const {
    active: tutorial,
    loadingState,
    setModalVisibility,
    showModal
  } = classifierStore.tutorials

  return {
    loadingState,
    setModalVisibility,
    showModal,
    tutorial
  }
}

function ModalTutorial ({
  loadingState = asyncStates.initialized,
  setModalVisibility = () => true,
  showModal = false,
  tutorial,
  ...props
}) {
  const { t } = useTranslation('components')

  function onClose() {
    setModalVisibility(false)
  }

  if (loadingState === asyncStates.success && tutorial) {
    return (
      <Modal
        {...props}
        active={showModal}
        closeFn={onClose}
        title={t('ModalTutorial.title')}
      >
        <ResponsiveContext.Consumer>
          {size => {
            const width = (size === 'small') ? '100%' : '330px'
            return (
              <SlideTutorial
                onClick={onClose}
                pad='none'
                width={width}
              />
            )
          }}
        </ResponsiveContext.Consumer>
      </Modal>
    )
  }

  return null
}

ModalTutorial.propTypes = {
  loadingState: PropTypes.string,
  showModal: PropTypes.bool,
  setModalVisibility: PropTypes.func.isRequired,
  tutorial: PropTypes.object
}

export default withStores(ModalTutorial, storeMapper)
export { ModalTutorial }
