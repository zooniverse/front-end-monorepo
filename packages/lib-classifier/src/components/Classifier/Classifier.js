import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import {
  endpoints as panoptesEndpoints,
  panoptes as panoptesClient,
  projects as projectsClient,
  tutorials as tutorialsClient
} from '@zooniverse/panoptes-js'

import { registerWorkers } from '../../workers'
import RootStore from 'src/store'
import Layout from './components/Layout'
import { isBackgroundSyncAvailable } from '../../helpers/featureDetection'

const client = {
  panoptes: panoptesClient,
  projects: projectsClient,
  tutorials: tutorialsClient
}

// We don't register the queue service worker if background sync API is not available
// We might want to move this check elsewhere once we add other service workers for other tasks
if (isBackgroundSyncAvailable()) registerWorkers()

export default class Classifier extends React.Component {
  constructor (props) {
    super(props)

    if (!props.panoptesEnv || !panoptesEndpoints[props.panoptesEnv]) {
      throw new Error('Classifier is missing valid `panoptesEnv` prop')
    }

    this.classifierStore = RootStore.create({}, {
      apiHost: panoptesEndpoints[props.panoptesEnv].host,
      authClient: props.authClient,
      client
    })

    console.info(this.classifierStore)

    makeInspectable(this.classifierStore)
  }

  componentDidMount () {
    const { project } = this.props
    this.setProject(project)
  }

  componentDidUpdate (prevProps) {
    const { authClient, project } = this.props
    if (project.id !== prevProps.project.id) {
      this.setProject(project)
    }

    if (authClient) {
      this.classifierStore.userProjectPreferences.checkForUser()
    }
  }

  setProject (project) {
    this.classifierStore.projects.setResource(project)
    this.classifierStore.projects.setActive(project.id)
  }

  render () {
    return (
      <Provider classifierStore={this.classifierStore}>
        <ThemeProvider theme={{ mode: this.props.mode }}>
          <Layout />
        </ThemeProvider>
      </Provider>
    )
    return (<div>foo</div>)
  }
}

Classifier.defaultProps = {
  mode: 'light'
}

Classifier.propTypes = {
  authClient: PropTypes.object.isRequired,
  mode: PropTypes.string,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
}
