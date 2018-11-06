import { Grommet } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '@zooniverse/grommet-theme'
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
if (isBackgroundSyncAvailable()) registerWorkers()

class Classifier extends React.Component {
  constructor () {
    super()
    this.classifierStore = RootStore.create({}, { client })
    makeInspectable(this.classifierStore)
  }

  componentDidMount () {
    const { project } = this.props
    this.classifierStore.projects.setActive(project.id)
  }

  componentDidUpdate (prevProps) {
    const { project } = this.props
    if (project.id !== prevProps.project.id) {
      this.classifierStore.projects.set(project.id)
    }
  }

  render () {
    return (
      <Provider classifierStore={this.classifierStore}>
        <ThemeProvider theme={{ mode: this.props.mode }}>
          <Grommet theme={theme}>
            <Layout />
          </Grommet>
        </ThemeProvider>
      </Provider>
    )
  }
}

Classifier.defaultProps = {
  mode: 'light'
}

Classifier.propTypes = {
  mode: PropTypes.string,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
}

export default Classifier
