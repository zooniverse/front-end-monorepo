import PropTypes from 'prop-types'
import React from 'react'
import counterpart from 'counterpart'
import { Modal } from '@zooniverse/react-components'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'

// TODO move translations to en from './locales/en'

counterpart.registerTranslations('en', {
  FeedbackModal: {
    title: 'Feedback',
    ok: 'OK'
  }
})

function storeMapper (stores) {
  const {
    feedbackMessages,
    modal: active,
    hideModal
  } = stores.classifierStore.feedback
  return {
    feedbackMessages,
    active,
    hideModal,
  }
}

@inject(storeMapper)
@observer
class FeedbackModal extends React.Component {

  closeModal () {
    this.props.hideModal()
  }

  render () {
    const { feedbackMessages, active } = this.props
    return (
      <Modal
        active={active}
        closeFn={this.closeModal.bind(this)}
        title={counterpart('FeedbackModal.title')}
      >
        <ul>
          {feedbackMessages && feedbackMessages.map(message =>
            <li key={Math.random()}>
              {message}
            </li>
          )}
        </ul>
      </Modal>
    )
  }
}

export default FeedbackModal
