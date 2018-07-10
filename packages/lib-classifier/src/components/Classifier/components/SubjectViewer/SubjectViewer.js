import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import asyncStates from '../../../../helpers/asyncStates'
import getViewer from './helpers/getViewer'

function storeMapper (stores) {
  const subjects = stores.classifierStore.subjects
  const workflow = stores.classifierStore.workflows.active
  return {
    subjects,
    workflow
  }
}

@inject(storeMapper)
@observer
class SubjectViewer extends React.Component {
  render () {
    const { subjects } = this.props
    const { loadingState } = subjects

    if (loadingState === asyncStates.initialized) {
      return null
    }

    if (loadingState === asyncStates.loading) {
      return (<div>Loading</div>)
    }

    if (loadingState === asyncStates.error) {
      console.error('There was an error loading the subjects')
      return null
    }

    const Viewer = getViewer(subjects.active.viewer)
    return <Viewer subject={subjects.active} {...this.props} />
  }
}

SubjectViewer.propTypes = {
  subjects: PropTypes.shape({
    loadingState: PropTypes.oneOf(asyncStates.values),
    active: PropTypes.shape({
      viewer: PropTypes.string
    })
  }),
  workflow: PropTypes.object
}

SubjectViewer.defaultProps = {
  subjects: {
    loadingState: asyncStates.initialized
  }
}

export default SubjectViewer
