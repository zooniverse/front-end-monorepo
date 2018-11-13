import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import FinishedForTheDay from './FinishedForTheDay'

function storeMapper (stores) {
  const { background, displayName } = stores.store.project
  return {
    imageSrc: background.src || '',
    projectName: displayName
  }
}

@inject(storeMapper)
@observer
class FinishedForTheDayContainer extends Component {
  render () {
    const { imageSrc, projectName } = this.props
    return (
      <FinishedForTheDay
        imageSrc={imageSrc}
        projectName={projectName}
      />
    )
  }
}

FinishedForTheDayContainer.propTypes = {
  imageSrc: PropTypes.string,
  projectName: PropTypes.string.isRequired
}

FinishedForTheDayContainer.defaultProps = {
  projectName: ''
}

export default FinishedForTheDayContainer
