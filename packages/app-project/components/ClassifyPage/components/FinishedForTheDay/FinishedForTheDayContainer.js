import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import FinishedForTheDay from './FinishedForTheDay'

@inject('store')
@observer
class FinishedForTheDayContainer extends Component {
  getProjectName () {
    return this.props.store.project?.displayName
  }

  getImageSrc () {
    return this.props.store.project?.backgrounds?[0]?.src
  }

  render () {
    return (
      <FinishedForTheDay
        projectName={this.getProjectName()}
        imageSrc={this.getImageSrc()}
      />
    )
  }
}

FinishedForTheDayContainer.propTypes = {
  store: PropTypes.shape({
    project: PropTypes.shape({
      backgrounds: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string
      })),
      displayName: PropTypes.string
    })
  })
}

export default FinishedForTheDayContainer
