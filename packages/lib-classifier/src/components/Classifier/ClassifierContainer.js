import PropTypes from 'prop-types'
import React from 'react'

import Classifier from './Classifier'

export default class ClassifierContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: this.checkEnvironment(props)
    }
  }

  cantRenderClassifier () {
    const prefix = '[@zooniverse/classifier]'
    this.state.errors.map(error => console.warn(`${prefix} ${error}`))
    console.error(`${prefix} Classifier will not render.`)
    return null
  }

  checkEnvironment (props) {
    const errors = []

    if (!process.browser) {
      errors.push(`Classifier can't be rendered on the server.`)
    }

    if (!props.authClient) {
      errors.push('You must pass in an `authClient` prop.')
    }

    if (!props.projectId) {
      errors.push('You must pass in a `projectId` prop.')
    }

    return errors
  }

  render () {
    return (this.state.errors.length === 0)
      ? this.renderClassifier()
      : this.cantRenderClassifier()
  }

  renderClassifier () {
    const { authClient, mode, projectId, user } = this.props
    return (
      <Classifier
        authClient={authClient}
        mode={mode}
        projectId={projectId}
        user={user}
      />
    )
  }
}

ClassifierContainer.propTypes = {
  authClient: PropTypes.object.isRequired,
  mode: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  user: PropTypes.object
}

ClassifierContainer.defaultProps = {
  mode: 'light',
  user: null
}
