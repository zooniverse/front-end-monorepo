import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'
import DrawingContainer from '../Drawing/DrawingContainer'

function storeMapper (stores) {
  const { addToStream } = stores.classifierStore.drawing
  const { activeStepTasks } = stores.classifierStore.workflowSteps
  return {
    activeStepTasks,
    addToStream
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
    const { activeStepTasks } = this.props
    const isDrawingInActiveSteps = activeStepTasks && activeStepTasks.some(task => task.type === 'drawing')

    return (
      <>
        <InteractionLayer
          onPointerDown={this.onPointerDown}
          onPointerMove={this.onPointerMove}
          onPointerUp={this.onPointerUp}
        />
        {isDrawingInActiveSteps && <DrawingContainer />}
      </>
    )
  }
}

InteractionLayerContainer.wrappedComponent.propTypes = {
  activeStepTasks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string
    })
  ),
  addToStream: PropTypes.func.isRequired
}

export default InteractionLayerContainer
