import React from 'react'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import { getSnapshot } from 'mobx-state-tree'

import Head from '../components/head'
import Nav from '../components/nav'
import ProjectHome from '../components/ProjectHome'
import initStore from '../stores'
import getProjectSlugFromURL from '../helpers/getProjectSlugFromURL'

class ProjectPage extends React.Component {
  static async getInitialProps ({ asPath, req }) {
    const props = {
      isServer: !!req
    }

    if (props.isServer) {
      const store = initStore(props.isServer)
      const slug = getProjectSlugFromURL(req.url)
      await store.project.fetch(slug)
      props.initialState = getSnapshot(store)
    }

    return props
  }

  constructor (props) {
    super(props)
    this.store = initStore(props.isServer, props.initialState)
  }

  componentDidUpdate (prevProps) {
    const slug = getProjectSlugFromURL(this.props.url.asPath)
    const prevSlug = getProjectSlugFromURL(prevProps.url.asPath)
    if (slug !== prevSlug) {
      this.store.project.fetch(slug)
    }
  }

  render () {
    return (
      <Provider store={this.store}>
        <Grommet>
          <Head title='Home' />
          <Nav />
          <ProjectHome />
        </Grommet>
      </Provider>
    )
  }
}

ProjectPage.propTypes = {
  store: PropTypes.shape({
    project: PropTypes.shape({
      fetch: PropTypes.func
    })
  }),
  url: PropTypes.shape({
    asPath: PropTypes.string,
  })
}

export default ProjectPage
