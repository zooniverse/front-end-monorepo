import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import SingleImageViewer from './components/SingleImageViewer'
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

    if (loadingState === asyncStates.error) {
      console.error('There was an error loading the subjects')
      return null
    }

    if (loadingState !== asyncStates.success) {
      return (<div>Loading</div>)
    }

    const Viewer = getViewer(subjects.active.viewer)
    return <Viewer subject={subjects.active} />
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

export default SubjectViewer
