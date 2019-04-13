import { Modal } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import FieldGuideButton from './components/FieldGuideButton'
import FieldGuide from './components/FieldGuide'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper(stores) {
  const { setModalVisibility, showModal } = stores.classifierStore.fieldGuide
  return {
    setModalVisibility,
    showModal
  }
}

@inject(storeMapper)
@observer
class FieldGuideContainer extends React.Component {
  onClose () {
    const { setModalVisibility } = this.props
    setModalVisibility(false)
  }

  render () {
    const {
      showModal
    } = this.props

    return (
      <>
        <FieldGuideButton />
        <Modal
          active={showModal}
          closeFn={this.onClose.bind(this)}
          modal={false}
          pad='medium'
          position="right"
          title={counterpart('FieldGuide.title')}
        >
          <FieldGuide />
        </Modal>
      </>
    )
  }
}

FieldGuideContainer.wrappedComponent.defaultProps = {
  showModal: false
}

FieldGuideContainer.wrappedComponent.propTypes = {
  setModalVisibility: PropTypes.func.isRequired,
  showModal: PropTypes.bool
}

export default FieldGuideContainer
