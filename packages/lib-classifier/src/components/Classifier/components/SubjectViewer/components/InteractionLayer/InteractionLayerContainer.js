import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'
import DrawingContainer from '../Drawing/DrawingContainer'

function storeMapper (stores) {
  const {
    addToStream,
    isDrawingInActiveWorkflowStep,
  } = stores.classifierStore.drawing
  return {
    addToStream,
    isDrawingInActiveWorkflowStep,
  }
}

@inject(storeMapper)
@observer
class InteractionLayerContainer extends Component {
  constructor () {
    super()
    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerMove = this.onPointerMove.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
  }

  onPointerDown (event) {
    this.props.addToStream(event)
  }

  onPointerMove (event) {
    this.props.addToStream(event)
  }

  onPointerUp (event) {
    this.props.addToStream(event)
  }

  render () {
    return (
      <>
        <InteractionLayer
          onPointerDown={this.onPointerDown}
          onPointerMove={this.onPointerMove}
          onPointerUp={this.onPointerUp}
        />
        {this.props.isDrawingInActiveWorkflowStep && <DrawingContainer />}
      </>
    )
  }
}

InteractionLayerContainer.wrappedComponent.propTypes = {
  addToStream: PropTypes.func.isRequired,
  isDrawingInActiveWorkflowStep: PropTypes.bool,
}

InteractionLayerContainer.wrappedComponent.defaultProps = {
  isDrawingInActiveWorkflowStep: false
}

export default InteractionLayerContainer
