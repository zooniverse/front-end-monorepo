import { Grommet } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import theme from '@zooniverse/grommet-theme'
import {
  panoptes as panoptesClient,
  projects as projectsClient
} from '@zooniverse/panoptes-js'
import Layout from './components/Layout'
import RootStore from 'src/store'

const client = {
  panoptes: panoptesClient,
  projects: projectsClient
}

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
        <Grommet theme={theme}>
          <Layout />
        </Grommet>
      </Provider>
    )
  }
}

Classifier.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
}

export default Classifier
