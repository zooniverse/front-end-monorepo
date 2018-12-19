import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import {
  panoptes as panoptesClient,
  projects as projectsClient
} from '@zooniverse/panoptes-js'

import { registerWorkers } from '../../workers'
import RootStore from 'src/store'
import Layout from './components/Layout'
import { isBackgroundSyncAvailable } from '../../helpers/featureDetection'

const client = {
  panoptes: panoptesClient,
  projects: projectsClient
}

// We don't register the queue service worker if background sync API is not available
// We might want to move this check elsewhere once we add other service workers for other tasks
// if (isBackgroundSyncAvailable()) registerWorkers()

export default class Classifier extends React.Component {
  constructor (props) {
    super(props)
    // console.info(client)
    this.classifierStore = RootStore.create({}, {
      authClient: props.authClient,
      client
    })
    makeInspectable(this.classifierStore)
  }

  componentDidMount () {
    const { projectId } = this.props
    this.setProject(projectId)
  }

  componentDidUpdate (prevProps) {
    const { projectId, user } = this.props
    if (projectId !== prevProps.projectId) {
      this.setProject(projectId)
    }

    if (!user) {
      this.classifierStore.userProjectPreferences.reset()
    }
  }

  setProject (project) {
    this.classifierStore.projects.setActive(projectId)
  }

  render () {
    return (
      <Provider classifierStore={this.classifierStore}>
        <ThemeProvider theme={{ mode: this.props.mode }}>
          <Layout />
        </ThemeProvider>
      </Provider>
    )
  }
}

Classifier.propTypes = {
  authClient: PropTypes.object.isRequired,
  mode: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  user: PropTypes.object
}

Classifier.defaultProps = {
  mode: 'light'
}
