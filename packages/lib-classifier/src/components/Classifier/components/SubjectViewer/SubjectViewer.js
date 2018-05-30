import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import getViewerComponent from './helpers/getViewerComponent'

function storeMapper (stores) {
  return {
    currentSubject: stores.classifierStore.subjects.current
  }
}

@inject(storeMapper)
@observer
class SubjectViewer extends React.Component {
  getViewerComponents() {
    return this.props.currentSubject.locations.map(getViewerComponent)
  }

  render () {
    if (!this.props.currentSubject) {
      return null
    }

    const Viewers = this.getViewerComponents()

    return (
      <React.Fragment>
        {Viewers.map(Viewer =>
          React.cloneElement(Viewer, { key: Viewer.props.url })
        )}
      </React.Fragment>
    )
  }
}

SubjectViewer.propTypes = {
  currentSubject: PropTypes.object
}

export default SubjectViewer
