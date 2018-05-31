import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import getViewerComponent from './helpers/getViewerComponent'
import composeViewers from './helpers/composeViewers'

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
    return composeViewers(Viewers)
  }
}

SubjectViewer.propTypes = {
  currentSubject: PropTypes.object
}

export default SubjectViewer
