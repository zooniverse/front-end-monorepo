import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import React from 'react'

import Head from '../components/head'
import Nav from '../components/nav'
import ProjectHome from '../components/ProjectHome'
import getProjectSlugFromURL from '../helpers/getProjectSlugFromURL'
import initStore from '../stores'

class ProjectPage extends React.Component {
  // getInitialProps looks like a React lifecycle method, but is actually a
  // Next.js method only called in page components. See https://git.io/vhZz9
  static async getInitialProps ({ req }) {
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
      this.store.project.fetch(slug).then(() => console.info(this.store))
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
  initialState: PropTypes.object,
  isServer: PropTypes.bool,
  store: PropTypes.shape({
    project: PropTypes.shape({
      fetch: PropTypes.func
    })
  }),
  url: PropTypes.shape({
    asPath: PropTypes.string
  })
}

export default ProjectPage
