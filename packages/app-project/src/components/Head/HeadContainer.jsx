import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import { arrayOf, shape, string } from 'prop-types'
import { Component } from 'react'

import Head from './Head'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    project
  }
}

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
    const { host, project: { slug } } = this.props
    return `${host}/projects/${slug}`
  }

  render () {
    return (
      <Head
        description={this.getProjectDescription()}
        ogImage={this.getProjectImage()}
        pageTitle={this.props.pageTitle}
        projectTwitterUsername={this.getProjectTwitterUsername()}
        title={this.getProjectTitle()}
        url={this.getProjectUrl()}
      />
    )
  }
}

HeadContainer.propTypes = {
  host: string,
  pageTitle: string,
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

const DecoratedHeadContainer = inject(storeMapper)(withRouter(observer(HeadContainer)))

export default DecoratedHeadContainer
export { HeadContainer }
