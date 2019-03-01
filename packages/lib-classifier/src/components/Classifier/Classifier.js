import { Grommet } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'
import {
  panoptes as panoptesClient,
  projects as projectsClient,
  tutorials as tutorialsClient
} from '@zooniverse/panoptes-js'

import { registerWorkers, unregisterWorkers } from '../../workers'
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
// if (isBackgroundSyncAvailable()) registerWorkers()

// TODO: The workbox background sync queue isn't working as expected
// It doesn't work with superagent/XHR req for interception
// We need to migrate to fetch API, otherwise the POST will occur twice
// Once in our store, once in the worker
// So we'll unregister the worker for now.
unregisterWorkers('./queue.js')

export default class Classifier extends React.Component {
  constructor (props) {
    super(props)
    this.classifierStore = RootStore.create({}, {
      authClient: props.authClient,
      client
    })
    makeInspectable(this.classifierStore)
  }

  componentDidMount () {
    const { onCompleteClassification, project } = this.props
    this.setProject(project)
    this.classifierStore.classifications.setOnComplete(onCompleteClassification)
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
        <Grommet theme={this.props.theme}>
          <ThemeProvider theme={{ mode: this.props.mode }}>
            <Layout />
          </ThemeProvider>
        </Grommet>
      </Provider>
    )
  }
}

Classifier.defaultProps = {
  mode: 'light',
  onCompleteClassification: () => true,
  theme: zooTheme
}

Classifier.propTypes = {
  authClient: PropTypes.object.isRequired,
  mode: PropTypes.string,
  onCompleteClassification: PropTypes.func,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  theme: PropTypes.object,
}
