import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Component } from 'react'

import FinishedForTheDay from './FinishedForTheDay'
import addQueryParams from '@helpers/addQueryParams'

function storeMapper (stores) {
  const { project, user } = stores.store
  return {
    imageSrc: project.background.src || '',
    isLoggedIn: user.isLoggedIn,
    projectName: project['display_name']
  }
}

class FinishedForTheDayContainer extends Component {
  getLinkProps () {
    const { router } = this.props
    const owner = router?.query?.owner
    const project = router?.query?.project
    return {
      href: addQueryParams(`/projects/${owner}/${project}/stats`)
    }
  }

  render () {
    const { imageSrc, isLoggedIn, projectName } = this.props
    const linkProps = this.getLinkProps()
    return (
      <FinishedForTheDay
        imageSrc={imageSrc}
        isLoggedIn={isLoggedIn}
        linkProps={linkProps}
        projectName={projectName}
      />
    )
  }
}

FinishedForTheDayContainer.propTypes = {
  imageSrc: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  projectName: PropTypes.string.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      project: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

// We wouldn't normally have a `defaultProp` for a required prop, but there's
// something going on with the store execution order which leaves it undefined
// without one.
FinishedForTheDayContainer.defaultProps = {
  imageSrc: '',
  isLoggedIn: false,
  projectName: ''
}

@inject(storeMapper)
@withRouter
@observer
class DecoratedFinishedForTheDayContainer extends FinishedForTheDayContainer { }

export {
  DecoratedFinishedForTheDayContainer as default,
  FinishedForTheDayContainer
}
