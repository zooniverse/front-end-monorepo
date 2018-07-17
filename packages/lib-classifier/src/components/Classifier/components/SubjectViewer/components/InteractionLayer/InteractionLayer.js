import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { fromEvent } from 'rxjs'

function storeMapper (stores) {
  const { active: task } = stores.classifierStore.tasks
  const { active: workflow } = stores.classifierStore.workflows
  const classifierState = stores.classifierStore.classifier
  return {
    classifierState,
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
  }

  componentDidMount () {
    function getObservables({ current: ref }) {
      const mouseDowns = fromEvent(ref, 'mousedown')
      const mouseMoves = fromEvent(ref, 'mousemove')
      const mouseUps = fromEvent(ref, 'mouseup')

      // return merge(mouseDowns, mouseMoves, mouseUps)
      return { mouseDowns, mouseMoves, mouseUps }
    }

    const observables = getObservables(this.interactionLayerRef)
    this.props.classifierState.setStream(observables)
  }

  componentWillUnmount () {
    this.props.classifierState.clearStream()
  }

  render () {
    return (
      <svg ref={this.interactionLayerRef} width='100%' height='100%'>
        <rect height='100%' width='100%' fill='transparent' />
      </svg>
    )
  }
}

export default InteractionLayer
