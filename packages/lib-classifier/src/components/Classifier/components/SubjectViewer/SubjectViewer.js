import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import SingleImageViewer from './components/SingleImageViewer'

const viewers = {
  singleImage: SingleImageViewer
}

function storeMapper (stores) {
  const subject = stores.classifierStore.subjects.active
  const workflow = stores.classifierStore.workflows.active
  return { subject, workflow }
}

@inject(storeMapper)
@observer
class SubjectViewer extends React.Component {
  render () {
    console.info(this.props.subject)

    if (!this.props.subject) {
      return (<div>Loading</div>)
    }

    const Viewer = viewers[this.props.subject.viewer]
    return <Viewer subject={this.props.subject} />
  }
}

SubjectViewer.propTypes = {
  subject: PropTypes.object,
  workflow: PropTypes.object
}

export default SubjectViewer
