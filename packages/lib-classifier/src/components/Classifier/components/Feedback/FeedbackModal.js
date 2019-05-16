import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Button, Box } from 'grommet'
import { Modal } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from './locales/en'

import getFeedbackViewer from './helpers/getFeedbackViewer'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  const {
    applicableRules,
    hideFeedback,
    hideSubjectViewer,
    messages,
    showModal
  } = stores.classifierStore.feedback
  return {
    applicableRules,
    hideFeedback,
    hideSubjectViewer,
    messages,
    showModal
  }
}

@inject(storeMapper)
@observer
class FeedbackModal extends React.Component {
  render () {
    const label = counterpart('FeedbackModal.label')
    const { applicableRules, hideFeedback, hideSubjectViewer, messages, showModal } = this.props
    const showViewer = !hideSubjectViewer && applicableRules && applicableRules.length > 0
    let FeedbackViewer = null
    if (showViewer) {
      FeedbackViewer = getFeedbackViewer(applicableRules)
    }

    if (showModal) {
      return (
        <Modal
          active={showModal}
          closeFn={hideFeedback}
          title={label}
        >
          <>
            <Box
              height='medium'
              width='medium'
            >
              {showViewer && (
                  <Box height='100%'>
                    <FeedbackViewer />
                  </Box>)}
              <Box overflow='scroll'>
                <ul>
                  {messages.map(message =>
                    <li key={Math.random()}>
                      {message}
                    </li>
                  )}
                </ul>
              </Box>
            </Box>
            <Box pad={{ top: 'small' }}>
              <Button
                onClick={hideFeedback}
                label={counterpart('FeedbackModal.keepClassifying')}
                primary
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
  applicableRules: PropTypes.arrayOf(
    PropTypes.shape({
      strategy: PropTypes.string
    })
  ),
  hideFeedback: PropTypes.func,
  hideSubjectViewer: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.string),
  showModal: PropTypes.bool
}

export default FeedbackModal
