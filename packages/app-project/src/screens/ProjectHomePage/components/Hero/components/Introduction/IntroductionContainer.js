import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import { shape, string } from 'prop-types'
import React, { Component } from 'react'

import Introduction from './Introduction'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    description: project.description,
    title: project.display_name
  }
}

class IntroductionContainer extends Component {
  getLink () {
    const { owner, project } = this.props.router.query
    return {
      as: `/projects/${owner}/${project}/about`,
      href: '/about'
    }
  }

  render () {
    const { description, title } = this.props
    const link = this.getLink()
    return (
      <Introduction description={description} link={link} title={title} />
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
