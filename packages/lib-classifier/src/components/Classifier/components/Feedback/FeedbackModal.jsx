import PropTypes from 'prop-types'
import { Button, Box } from 'grommet'
import { Modal } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

import { withStores } from '@helpers'
import getFeedbackViewer from './helpers/getFeedbackViewer'
import reduceFeedbackMessages from './helpers/reduceFeedbackMessages'

function storeMapper(classifierStore) {
  const {
    applicableRules,
    hideFeedback,
    hideSubjectViewer,
    messages,
    showModal
  } = classifierStore.feedback

  return {
    applicableRules,
    hideFeedback,
    hideSubjectViewer,
    messages,
    showModal
  }
}

function FeedbackModal({
  applicableRules,
  hideFeedback,
  hideSubjectViewer,
  messages,
  showModal
}) {
  const { t } = useTranslation('components')
  const label = t('FeedbackModal.label')
  const showViewer = !hideSubjectViewer && applicableRules?.length > 0
  const FeedbackViewer = showViewer ? getFeedbackViewer(applicableRules) : null
  const messageContainerHeight = (showViewer && !!FeedbackViewer) ? '400px' : '100%'
  const reducedMessages = reduceFeedbackMessages(messages)

  if (showModal) {
    return (
      <Modal
        active
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

FeedbackModal.propTypes = {
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

export default withStores(FeedbackModal, storeMapper)
export { FeedbackModal }
