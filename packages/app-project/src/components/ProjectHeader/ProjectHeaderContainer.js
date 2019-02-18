import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ProjectHeader from './ProjectHeader'

@inject('store')
@observer
class ProjectHeaderContainer extends Component {
  render () {
    return (
      <ProjectHeader />
    )
  }
}

ProjectHeaderContainer.propTypes = {
}

ProjectHeaderContainer.defaultProps = {
}

export default ProjectHeaderContainer
