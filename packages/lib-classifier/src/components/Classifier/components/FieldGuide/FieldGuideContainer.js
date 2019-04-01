import { Modal } from '@zooniverse/react-components'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { Button, Box } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import FieldGuideButton from './components/FieldGuideButton'
import FieldGuide from './components/FieldGuide'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper(stores) {
  const { active: fieldGuide, attachedMedia, setModalVisibility, showModal } = stores.classifierStore.fieldGuide
  return {
    attachedMedia,
    fieldGuide,
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
      attachedMedia,
      fieldGuide,
      showModal
    } = this.props

    return (
      <>
        <FieldGuideButton />
        <Modal
          active={showModal}
          closeFn={this.onClose.bind(this)}
          title={counterpart('FieldGuide.title')}
        >
          <FieldGuide icons={attachedMedia} items={fieldGuide.items} />
        </Modal>
      </>
    )
  }
}

FieldGuideContainer.wrappedComponent.defaultProps = {
  fieldGuide: {
    items: []
  },
  showModal: false
}

FieldGuideContainer.propTypes = {
  fieldGuide: PropTypes.shape({
    items: PropTypes.array
  }),
  setModalVisibility: PropTypes.func.isRequired,
  showModal: PropTypes.bool
}

// FieldGuide.propTypes = {
//   eventHandlers: PropTypes.object,
//   hoverOrFocus: PropTypes.bool
// }

export default FieldGuideContainer
