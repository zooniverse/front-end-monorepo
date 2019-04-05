import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import AboutProject from './AboutProject'

function storeMapper(stores) {
  const { project } = stores.store
  return {
    projectName: project.display_name
  }
}

@inject(storeMapper)
@observer
class AboutProjectContainer extends Component {
  render() {
    const { projectName, description } = this.props

    return <AboutProject description={description} projectName={projectName} />
  }
}

AboutProjectContainer.propTypes = {
  description: PropTypes.string,
  projectName: PropTypes.string
}

AboutProjectContainer.defaultProps = {
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis volutpat quam sed nibh interdum, interdum bibendum nisi commodo. In id dui enim. Etiam euismod leo sit amet eros pharetra ullamcorper. Fusce sed dui tincidunt, lobortis tortor a, gravida magna. Quisque ac ligula tristique, iaculis metus vel, pellentesque nulla.'
}

export default AboutProjectContainer
