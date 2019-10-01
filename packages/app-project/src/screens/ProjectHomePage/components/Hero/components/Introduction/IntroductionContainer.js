import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import { shape, string } from 'prop-types'
import React, { Component } from 'react'

import Introduction from './Introduction'
import addQueryParams from '@helpers/addQueryParams'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    description: project.description,
    title: project['display_name']
  }
}

class IntroductionContainer extends Component {
  getLinkProps () {
    const { router } = this.props
    const { owner, project } = router.query
    return {
      href: addQueryParams(`/projects/${owner}/${project}/about`, router),
    }
  }

  render () {
    const { description, title } = this.props
    const linkProps = this.getLinkProps()
    return (
      <Introduction description={description} linkProps={linkProps} title={title} />
    )
  }
}

IntroductionContainer.propTypes = {
  description: string.isRequired,
  router: shape({
    query: shape({
      owner: string.isRequired,
      project: string.isRequired
    }).isRequired
  }).isRequired,
  title: string.isRequired
}

@inject(storeMapper)
@withRouter
@observer
class DecoratedIntroductionContainer extends IntroductionContainer {}

export {
  DecoratedIntroductionContainer as default,
  IntroductionContainer
}
