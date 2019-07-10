import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import AboutProject from './AboutProject'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    description: project.introduction,
    projectName: project.display_name
  }
}

@inject(storeMapper)
@observer
class AboutProjectContainer extends Component {
  render () {
    const { description, projectName } = this.props
    return (
      <AboutProject
        description={description}
        projectName={projectName}
      />
    )
  }
}

AboutProjectContainer.propTypes = {
  description: string,
  projectName: string
}

export default AboutProjectContainer
