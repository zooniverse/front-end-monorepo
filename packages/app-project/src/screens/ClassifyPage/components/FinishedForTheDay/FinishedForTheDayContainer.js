import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import FinishedForTheDay from './FinishedForTheDay'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    imageSrc: project.background.src || '',
    projectName: project['display_name']
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

// We wouldn't normally have a `defaultProp` for a required prop, but there's
// something going on with the store execution order which leaves it undefined
// without one.
FinishedForTheDayContainer.defaultProps = {
  projectName: ''
}

export default FinishedForTheDayContainer
