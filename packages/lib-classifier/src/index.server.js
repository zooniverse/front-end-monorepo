import PropTypes from 'prop-types'
import React from 'react'

class Classifier extends React.Component {
  render () {
    return (
      <div>Loading... {this.props.project.displayName}</div>
    )
  }
}

export default Classifier
