import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'
import DrawingContainer from '../Drawing/DrawingContainer';

function storeMapper (stores) {
  const {
    addToStream
  } = stores.classifierStore.drawing
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

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  addToStream (event) {
    this.props.addToStream(event)
  }

  onMouseDown (event) {
    this.addToStream(event)
  }

  onMouseMove (event) {
    this.addToStream(event)
  }

  onMouseUp (event) {
    this.addToStream(event)
  }

  render () {
    const drawing = this.props.activeStepTasks.some(task => task.type === 'drawing')

    return (
      <>
        <InteractionLayer
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        />
        {drawing && <DrawingContainer svg={this.props.svg} />}
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
  addToStream: PropTypes.func,
  svg: PropTypes.object
}

export default InteractionLayerContainer
