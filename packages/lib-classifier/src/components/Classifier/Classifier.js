import { GraphQLClient } from 'graphql-request'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import {
  env,
  panoptes as panoptesClient,
  projects as projectsClient,
  tutorials as tutorialsClient
} from '@zooniverse/panoptes-js'

// Pointer event API polyfill just for Safari 12
// Can likely be removed Sept 2020
import 'pepjs'

import { unregisterWorkers } from '../../workers'
import RootStore from '../../store'
import Layout from './components/Layout'
import ModalTutorial from './components/ModalTutorial'
// import { isBackgroundSyncAvailable } from '../../helpers/featureDetection'
function caesarClient (env) {
  switch (env) {
    case 'production': {
       return new GraphQLClient('https://caesar.zooniverse.org/graphql')
    }
    default: {
      return new GraphQLClient('https://caesar-staging.zooniverse.org/graphql')
    }
  }
}

const client = {
  caesar: caesarClient(env),
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
    const { onAddToCollection, onCompleteClassification, onToggleFavourite, project, subjectSetID, workflowID } = this.props
    this.setProject(project)
    this.classifierStore.setOnAddToCollection(onAddToCollection)
    this.classifierStore.classifications.setOnComplete(onCompleteClassification)
    this.classifierStore.setOnToggleFavourite(onToggleFavourite)
    this.classifierStore.workflows.selectWorkflow(workflowID, subjectSetID)
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
    this.classifierStore.projects.setResources([project])
    this.classifierStore.projects.setActive(project.id)
  }

  render () {
    return (
      <Provider classifierStore={this.classifierStore}>
          <>
            <Layout />
            <ModalTutorial />
          </>
      </Provider>
    )
  }
}

Classifier.defaultProps = {
  mode: 'light',
  onAddToCollection: () => true,
  onCompleteClassification: () => true,
  onToggleFavourite: () => true,
  theme: zooTheme
}

Classifier.propTypes = {
  authClient: PropTypes.object.isRequired,
  mode: PropTypes.string,
  onAddToCollection: PropTypes.func,
  onCompleteClassification: PropTypes.func,
  onToggleFavourite: PropTypes.func,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  theme: PropTypes.object
}
