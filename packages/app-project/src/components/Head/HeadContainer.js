import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import { arrayOf, shape, string } from 'prop-types'
import React, { Component } from 'react'

import Head from './Head'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    project
  }
}

@withRouter
@inject(storeMapper)
@observer
class HeadContainer extends Component {
  getProjectDescription () {
    return this.props.project.description || undefined
  }

  getProjectImage () {
    const { avatar, background } = this.props.project
    return (avatar && avatar.src) ||
      (background && background.src) ||
      undefined
  }

  getProjectTitle () {
    const { project } = this.props
    return project['display_name'] || project.title || project.slug || undefined
  }

  getProjectTwitterUsername () {
    const twitter = this.props.project.urls.find(({ site }) => site &&
      site.includes('twitter.com'))

    if (twitter && twitter.path) {
      return (twitter.path.startsWith('@'))
        ? twitter.path
        : `@${twitter.path}`
    } else {
      return undefined
    }
  }

  getProjectUrl () {
    // TODO: Set this from an environment variable
    const host = 'http://localhost:3000'
    const { slug } = this.props.project
    return `${host}/projects/${slug}`
  }

  render () {
    return (
      <Head
        description={this.getProjectDescription()}
        ogImage={this.getProjectImage()}
        projectTwitterUsername={this.getProjectTwitterUsername()}
        title={this.getProjectTitle()}
        url={this.getProjectUrl()}
      />
    )
  }
}

HeadContainer.propTypes = {
  project: shape({
    avatar: shape({
      src: string
    }),
    background: shape({
      src: string
    }),
    description: string,
    projectName: string,
    slug: string,
    urls: arrayOf(shape({
      path: string.isRequired,
      site: string.isRequired
    }))
  })
}

export default HeadContainer
