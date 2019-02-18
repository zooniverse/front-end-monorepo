import { get } from 'lodash'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import { arrayOf, shape, string } from 'prop-types'
import React, { Component } from 'react'
import urlParse from 'url-parse'

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
export default class HeadContainer extends Component {
  getProjectDescription () {
    return this.props.project.description || undefined
  }

  getProjectImage () {
    return get(this.props.project, 'avatar.src') ||
      get(this.props.project, 'background.src') ||
      undefined
  }

  getProjectTitle () {
    const { display_name, slug } = this.props.project
    return display_name || slug || undefined
  }

  getProjectTwitterUsername () {
    const { urls } = this.props.project
    const twitter = urls.find(({ site }) => site &&
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
    description: string,
    display_name: string,
    urls: arrayOf(shape({
      path: string.isRequired,
      site: string.isRequired
    })),
    slug: string,
  }),
}
