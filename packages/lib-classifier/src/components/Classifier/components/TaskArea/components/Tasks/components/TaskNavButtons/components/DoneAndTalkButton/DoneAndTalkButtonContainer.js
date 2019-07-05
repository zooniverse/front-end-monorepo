import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import DoneAndTalkButton from './DoneAndTalkButton'

function storeMapper (stores) {
  const {
    shouldWeShowDoneAndTalkButton
  } = stores.classifierStore.workflowSteps
  const {
    active: subject
  } = stores.classifierStore.subjects

  return {
    shouldWeShowDoneAndTalkButton,
    subject
  }
}

@inject(storeMapper)
@observer
class DoneAndTalkButtonContainer extends React.Component {
  render () {
    const {
      completed,
      demoMode,
      disabled,
      goldStandardMode,
      onClick,
      shouldWeShowDoneAndTalkButton,
      subject
    } = this.props

    if (shouldWeShowDoneAndTalkButton && subject.id) {
      function openTalkLinkAndClick (event) {
        const isCmdClick = event.metaKey

        subject.openInTalk(isCmdClick)
        onClick(event)
      }

      return (
        <DoneAndTalkButton
          completed={completed}
          demoMode={demoMode}
          disabled={disabled}
          goldStandardMode={goldStandardMode}
          onClick={openTalkLinkAndClick}
        />
      )
    }

    return null
  }
}

DoneAndTalkButtonContainer.wrappedComponent.defaultProps = {
  completed: false,
  demoMode: false,
  disabled: false,
  goldStandardMode: false,
  onClick: () => {},
  shouldWeShowDoneAndTalkButton: false,
  subject: {}
}

DoneAndTalkButtonContainer.wrappedComponent.propTypes = {
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  disabled: PropTypes.bool,
  goldStandardMode: PropTypes.bool,
  onClick: PropTypes.func,
  shouldWeShowDoneAndTalkButton: PropTypes.bool,
  subject: PropTypes.shape({
    id: PropTypes.string
  })
}

export default DoneAndTalkButtonContainer
