import asyncStates from '@zooniverse/async-states'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import getViewer from './helpers/getViewer'

function storeMapper (stores) {
  const { active: subject, loadingState } = stores.classifierStore.subjects
  const { onSubjectReady, onError, loadingState: subjectReadyState } = stores.classifierStore.subjectViewer
  return {
    loadingState,
    onError,
    onSubjectReady,
    subject,
    subjectReadyState
  }
}

@inject(storeMapper)
@observer
class SubjectViewer extends React.Component {
  [asyncStates.initialized] () {
    return null
  }

  [asyncStates.loading] () {
    return (<div>Loading</div>)
  }

  [asyncStates.error] () {
    console.error('There was an error loading the subjects')
    return null
  }

  [asyncStates.success] () {
    const { onError, onSubjectReady, subject, subjectReadyState } = this.props
    const Viewer = getViewer(subject.viewer)
    return (
      <Viewer
        key={subject.id}
        subject={subject}
        loadingState={subjectReadyState}
        onError={onError}
        onReady={onSubjectReady}
      />
    )
  }

  render () {
    const { loadingState } = this.props
    return this[loadingState]() || null
  }
}

SubjectViewer.wrappedComponent.propTypes = {
  loadingState: PropTypes.oneOf(asyncStates.values),
  subject: PropTypes.shape({
    viewer: PropTypes.string
  })
}

SubjectViewer.wrappedComponent.defaultProps = {
  loadingState: asyncStates.initialized
}

export default SubjectViewer
