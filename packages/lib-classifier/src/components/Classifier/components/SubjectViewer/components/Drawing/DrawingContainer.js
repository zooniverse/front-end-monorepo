import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import getDrawingTool from './helpers/getDrawingTool'

function storeMapper (stores) {
  const {
    activeDrawingTask,
    activeMark,
    marks

  } = stores.classifierStore.drawing
  return {
    activeDrawingTask,
    activeMark,
    marks
  }
}

@inject(storeMapper)
@observer
class DrawingContainer extends Component {
  render () {
    const { activeDrawingTask, activeMark, marks } = this.props
    return (
      <>
        {Array.from(marks, ([id, mark]) => {
          if (!mark.coordinates) return null

          const tool = activeDrawingTask.tools[mark.toolIndex]
          const MarkingComponent = getDrawingTool(tool.type)

          return (
            <MarkingComponent
              key={id}
              active={mark === activeMark}
              coordinates={mark.coordinates}
              tool={tool}
            />
          )
        })}
      </>
    )
  }
}

DrawingContainer.wrappedComponent.propTypes = {
  activeDrawingTask: PropTypes.shape({
    tools: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string
      })
    )
  }),
  activeMark: PropTypes.shape({
    coordinates: PropTypes.object,
    toolIndex: PropTypes.number
  })
}

export default DrawingContainer
