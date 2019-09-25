import { shape, string } from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'next/router'

import JoinInButton from './JoinInButton'
import addQueryParams from '../../../../../../helpers/addQueryParams'

class JoinInButtonContainer extends Component {
  render () {
    const { router } = this.props
    const { owner, project } = router.query
    const href = addQueryParams(`/projects/${owner}/${project}/talk`, router)

    return (
      <JoinInButton href={href} />
    )
  }
}

JoinInButtonContainer.propTypes = {
  router: shape({
    query: shape({
      owner: string.isRequired,
      project: string.isRequired
    }).isRequired
  }).isRequired
}

@withRouter
class DecoratedJoinInButtonContainer extends JoinInButtonContainer { }

export default DecoratedJoinInButtonContainer
export { JoinInButtonContainer }
