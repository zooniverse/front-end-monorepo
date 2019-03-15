import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Button, Box } from 'grommet'
import { Modal } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from './locales/en'

import SubjectViewer from '../SubjectViewer'

counterpart.registerTranslations('en', en)

function storeMapper(stores) {
  const { 
    hideFeedback,
    messages,
    showModal
  } = stores.classifierStore.feedback
  return {
    hideFeedback,
    messages,
    showModal
  }
}

@inject(storeMapper)
@observer
class FeedbackModal extends React.Component {
  render () {
    const label = counterpart('FeedbackModal.label')
    const { hideFeedback, messages, showModal } = this.props

    if (showModal) {
      return (
        <Modal
          active={showModal}
          closeFn={() => hideFeedback()}
          title={label}
        >
          <>
            <Box
              height="medium"
              overflow="auto"
            >
              <SubjectViewer />
              <ul>
                {messages.map(message =>
                  <li key={Math.random()}>
                    {message}
                  </li>
                )}
              </ul>
            </Box>
            <Box pad={{ top: 'small' }}>
              <Button
                onClick={() => hideFeedback()}
                label={counterpart('FeedbackModal.close')}
                primary={true}
              />
            </Box>
          </>
        </Modal>
      )
    }

    return null
  }
}

FeedbackModal.wrappedComponent.propTypes = {
  hideFeedback: PropTypes.func,
  messages: PropTypes.arrayOf(PropTypes.string),
  showModal: PropTypes.bool
}

export default FeedbackModal
