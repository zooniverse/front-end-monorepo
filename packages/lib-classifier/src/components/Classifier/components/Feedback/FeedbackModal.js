import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Button, Box } from 'grommet'
import { Modal } from '@zooniverse/react-components'
import { useTranslation, withTranslation } from 'react-i18next'

import getFeedbackViewer from './helpers/getFeedbackViewer'
import reduceFeedbackMessages from './helpers/reduceFeedbackMessages'

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
    const { applicableRules, hideFeedback, hideSubjectViewer, messages, showModal, t } = this.props
    const showViewer = !hideSubjectViewer && applicableRules && applicableRules.length > 0
    let FeedbackViewer = null

    if (showViewer) {
      FeedbackViewer = getFeedbackViewer(applicableRules)
    }

    const messageContainerHeight = (showViewer && !!FeedbackViewer) ? '400px' : '100%'

    const reducedMessages = reduceFeedbackMessages(messages)

    if (showModal) {
      return (
        <Modal
          active={showModal}
          closeFn={hideFeedback}
          title={label}
        >
          <>
            {showViewer && !!FeedbackViewer && (
              <Box
                height='400px'
                width='600px'
              >
                <FeedbackViewer />
              </Box>)}
            <Box height={messageContainerHeight} overflow='scroll'>
              <ul>
                {reducedMessages.map(message =>
                  <li key={Math.random()}>
                    {message.text} <small>({message.count} { message.count === 1 ? 'match' : 'matches' })</small>
                  </li>
                )}
              </ul>
            </Box>
            <Box pad={{ top: 'small' }}>
              <Button
                onClick={hideFeedback}
                label={t('FeedbackModal.keepClassifying')}
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

export default withTranslation('components')(FeedbackModal)
export {
  FeedbackModal
}
