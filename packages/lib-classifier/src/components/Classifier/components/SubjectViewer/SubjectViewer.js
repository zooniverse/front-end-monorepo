import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import asyncStates from '../../../../helpers/asyncStates'
import getViewer from './helpers/getViewer'

function storeMapper (stores) {
  const { active: subject, loadingState } = stores.classifierStore.subjects
  return {
    loadingState,
    subject,
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
    const { subject } = this.props
    const Viewer = getViewer(subject.viewer)
    return <Viewer subject={subject} {...this.props} />
  }

  render () {
    const { loadingState } = this.props
    return this[loadingState]() || null
  }
}

SubjectViewer.propTypes = {
  loadingState: PropTypes.oneOf(asyncStates.values),
  subject: PropTypes.shape({
    viewer: PropTypes.string
  })
}

SubjectViewer.defaultProps = {
  loadingState: asyncStates.initialized
}

export default SubjectViewer
