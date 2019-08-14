import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import { shape, string } from 'prop-types'
import React, { Component } from 'react'

import Introduction from './Introduction'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    description: project.description,
    title: project.display_name,
  }
}

class IntroductionContainer extends Component {
  getLink () {
    const { query } = this.props.router
    const linkQuery = {
      owner: query.owner,
      project: query.project,
    }

    return {
      as: `/projects/${query.owner}/${query.project}/about`,
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
  description: string,
  router: shape({
    query: shape({
      owner: string,
      project: string
    })
  }),
  title: string
}

@inject(storeMapper)
@withRouter
@observer
class DecoratedIntroductionContainer extends IntroductionContainer {}

export {
  DecoratedIntroductionContainer as default,
  IntroductionContainer
}
