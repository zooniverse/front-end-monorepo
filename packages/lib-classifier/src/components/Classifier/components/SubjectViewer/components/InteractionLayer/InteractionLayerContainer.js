import { observable } from 'mobx'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'
import DrawingContainer from '../Drawing/DrawingContainer'

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

    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerMove = this.onPointerMove.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
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
    const yas = this.props.activeStepTasks
    console.log('yas', (typeof yas))

    const drawing = this.props.activeStepTasks.some(task => task.type === 'drawing')

    return (
      <>
        <InteractionLayer
          onPointerMove={this.onPointerMove}
          onPointerDown={this.onPointerDown}
          onPointerUp={this.onPointerUp}
        />
        {drawing && <DrawingContainer svg={this.props.svg} />}
      </>
    )
  }
}

InteractionLayerContainer.wrappedComponent.defaultProps = {
  activeStepTasks: []
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
