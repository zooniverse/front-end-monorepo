import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import FinishedForTheDay from './FinishedForTheDay'

function storeMapper (stores) {
  const { project, user } = stores.store
  return {
    imageSrc: project.background.src || '',
    isLoggedIn: user.isLoggedIn,
    projectName: project['display_name'],
    slug: project.slug
  }
}

@inject(storeMapper)
@observer
class FinishedForTheDayContainer extends Component {
  render () {
    const { imageSrc, isLoggedIn, projectName, slug } = this.props
    return (
      <FinishedForTheDay
        imageSrc={imageSrc}
        isLoggedIn={isLoggedIn}
        projectName={projectName}
        slug={slug}
      />
    )
  }
}

FinishedForTheDayContainer.wrappedComponent.propTypes = {
  imageSrc: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  projectName: PropTypes.string.isRequired,
  slug: PropTypes.string
}

// We wouldn't normally have a `defaultProp` for a required prop, but there's
// something going on with the store execution order which leaves it undefined
// without one.
FinishedForTheDayContainer.wrappedComponent.defaultProps = {
  imageSrc: '',
  isLoggedIn: false,
  projectName: ''
}

export default FinishedForTheDayContainer
