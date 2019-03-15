import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import { Modal } from '@zooniverse/react-components'
import asyncStates from '@zooniverse/async-states'
import SlideTutorial from '../SlideTutorial'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper(stores) {
  const { active: tutorial, loadingState, setModalVisibility, showModal } = stores.classifierStore.tutorials
  return {
    loadingState,
    setModalVisibility,
    showModal,
    tutorial
  }
}

@inject(storeMapper)
@observer
class ModalTutorial extends React.Component {
  render() {
    const { loadingState, showModal, setModalVisibility, tutorial } = this.props
    if (loadingState === asyncStates.success && tutorial) {
      return (
        <Modal
          {...this.props}
          active={showModal}
          closeFn={() => { setModalVisibility(false) }}
          title={counterpart('ModalTutorial.title')}
        >
          <SlideTutorial pad="none" width="330px" />
        </Modal>
      )
    }

    return null
  }
}

ModalTutorial.wrappedComponent.defaultProps = {
  loadingState: asyncStates.initialized,
  showModal: false,
  tutorial: {}
}

ModalTutorial.wrappedComponent.propTypes = {
  loadingState: PropTypes.string,
  showModal: PropTypes.bool,
  setModalVisibility: PropTypes.func.isRequired,
  tutorial: PropTypes.object
}

export default ModalTutorial
