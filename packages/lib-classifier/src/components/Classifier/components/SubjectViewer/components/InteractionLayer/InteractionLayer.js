import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { from } from 'rxjs'
import { toStream } from 'mobx-utils'

import Annotations from './Annotations'
import * as pointTool from './drawing-tools/Point'

function storeMapper (stores) {
  const { active: task } = stores.classifierStore.tasks
  const { active: workflow } = stores.classifierStore.workflows
  const { classifier } = stores.classifierStore
  const { classification } = stores.classifierStore
  return {
    classifier,
    classification,
    task,
    workflow
  }
}

@inject(storeMapper)
@observer
class InteractionLayer extends React.Component {
  constructor () {
    super()
    this.interactionLayerRef = React.createRef()
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  componentDidMount () {
    const stream = from(toStream(() => this.props.classifier.mouseEventStream))

    // In future, the clickHandler will be set programmatically depending on the
    // task selected.
    pointTool.clickHandler(stream, this.props.classification)
  }

  setEvent(event, type) {
    this.props.classifier.setStream({
      event: type, 
      target: event.target, 
      x: event.clientX, 
      y: event.clientY
    })
  }

  onMouseDown (event) {
    this.setEvent(event, 'mouseDown')
  }
  
  onMouseMove (event) {
    this.setEvent(event, 'mouseMove')
  }
  
  onMouseUp (event) {
    this.setEvent(event, 'mouseUp')
  }

  onClick (event) {
    this.props.classifier.setStream({
      event: 'click', 
      target: event.target, 
      x: event.clientX, 
      y: event.clientY
    })
  }

  render () {
    // We'll also need to set events for other interaction types (e.g. touch),
    // and merge those into the observable stream.
    return (
      <svg 
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        width='100%' 
        height='100%'
      >
        <rect 
          name="interactionLayer"
          height='100%' 
          width='100%' 
          fill='transparent' 
        />
        <Annotations />
      </svg>
    )
  }
}

export default InteractionLayer
