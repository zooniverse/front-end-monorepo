import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import getSubjectViewer from './helpers/getSubjectViewer'

function storeMapper (stores) {
  const subject = stores.classifierStore.subjects.active
  const workflow = stores.classifierStore.workflows.active
  return { subject, workflow }
}

@inject(storeMapper)
@observer
class SubjectViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewer: null
    }
  }

  componentDidMount () {
    this.setViewer()
  }

  componentDidUpdate (prevProps) {
    const { subject, workflow } = this.props
    if (subject && workflow && subject !== prevProps.subject) {
      this.setViewer()
    }
  }

  setViewer () {
    const { subject, workflow } = this.props
    const newState = Object.assign({}, this.state)
    newState.viewer = (subject && workflow)
      ? getSubjectViewer(subject, workflow)
      : null
    this.setState(newState)
  }

  render () {
    const { subject } = this.props
    const { viewer } = this.state

    if (viewer) {
      const Viewer = viewer
      return <Viewer subject={subject} />
    }
    return null
  }
}

SubjectViewer.propTypes = {
  subject: PropTypes.object,
  workflow: PropTypes.object
}

export default SubjectViewer
