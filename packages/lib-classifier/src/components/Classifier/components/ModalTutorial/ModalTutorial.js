import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContext } from 'grommet'
import { Modal } from '@zooniverse/react-components'
import asyncStates from '@zooniverse/async-states'
import { useTranslation } from 'react-i18next'

import { withStores } from '@helpers'
import SlideTutorial from '../SlideTutorial'

function storeMapper(classifierStore) {
  const {
    tutorials: {
      loadingState,
      setModalVisibility,
      setSeenTime,
      showModal
    },
    workflows: {
      active: workflow
    }
  } = classifierStore

  return {
    loadingState,
    setModalVisibility,
    setSeenTime,
    showModal,
    tutorial: workflow?.tutorial
  }
}

function ModalTutorial({
  loadingState = asyncStates.initialized,
  setModalVisibility = () => true,
  setSeenTime,
  showModal = false,
  tutorial,
  ...props
}) {
  const { t } = useTranslation('components')

  function onClose() {
    setSeenTime(tutorial)
    setModalVisibility(false)
  }

  if (tutorial) {
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
