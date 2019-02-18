import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import { shape, string } from 'prop-types'
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

  getProjectBackgroundImage () {
    return this.props.project.background.src || undefined
  }

  getProjectTitle () {
    const { display_name, slug } = this.props.project
    return display_name || slug || undefined
  }

  getProjectTwitterUsername () {
    const { urls } = this.props.project
    const twitter = urls.find(url => url.site &&
      url.site.includes('twitter.com'))
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
        ogImage={this.getProjectBackgroundImage()}
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
    slug: string,
  }),
}
