import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import DoneAndTalkButton from './DoneAndTalkButton';

function storeMapper(stores) {
  const {
    shouldWeShowDoneAndTalkButton,
  } = stores.classifierStore.workflowSteps
  const {
    active: subject
  } = stores.classifierStore.subjects
  const {
    active: project
  } = stores.classifierStore.projects

  return {
    project,
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
      project, 
      shouldWeShowDoneAndTalkButton, 
      subject 
    } = this.props
    const projectSlug = project && project.slug
    const subjectId = subject && subject.id

    if (shouldWeShowDoneAndTalkButton && projectSlug && subjectId) {
      return (
        <DoneAndTalkButton
          completed={completed}
          demoMode={demoMode}
          disabled={disabled}
          goldStandardMode={goldStandardMode}
          onClick={onClick}
          projectSlug={projectSlug}
          subjectId={subjectId}
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
  project: {},
  shouldWeShowDoneAndTalkButton: false,
  subject: {}
}

DoneAndTalkButtonContainer.wrappedComponent.propTypes = {
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  disabled: PropTypes.bool,
  goldStandardMode: PropTypes.bool,
  onClick: () => {},
  project: PropTypes.shape({
    slug: PropTypes.string
  }),
  shouldWeShowDoneAndTalkButton: PropTypes.bool,
  subject: PropTypes.shape({
    id: PropTypes.string
  })
}

export default DoneAndTalkButtonContainer