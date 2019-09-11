import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'
import DrawingContainer from '../Drawing/DrawingContainer'

function storeMapper (stores) {
  const {
    addToStream,
    drawingInActiveWorkflowStepBoolean,
    storeSVG
  } = stores.classifierStore.drawing
  return {
    addToStream,
    drawingInActiveWorkflowStepBoolean,
    storeSVG
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

  componentDidMount () {
    this.storeSVG()
  }

  componentDidUpdate (prevProps) {
    if (this.props.svg !== prevProps.svg) {
      this.storeSVG()
    }
  }

  storeSVG () {
    const { storeSVG, svg } = this.props
    storeSVG(svg)
  }

  addToStream (event) {
    this.props.addToStream(event)
  }

  onPointerDown (event) {
    this.addToStream(event)
  }

  onPointerMove (event) {
    this.addToStream(event)
  }

  onPointerUp (event) {
    this.addToStream(event)
  }

  render () {
    return (
      <>
        <InteractionLayer
          onPointerDown={this.onPointerDown}
          onPointerMove={this.onPointerMove}
          onPointerUp={this.onPointerUp}
        />
        {this.props.drawingInActiveWorkflowStepBoolean && <DrawingContainer />}
      </>
    )
  }
}

InteractionLayerContainer.wrappedComponent.defaultProps = {
  drawingInActiveWorkflowStepBoolean: false
}

InteractionLayerContainer.wrappedComponent.propTypes = {
  addToStream: PropTypes.func,
  drawingInActiveWorkflowStepBoolean: PropTypes.bool,
  svg: PropTypes.object
}

export default InteractionLayerContainer
