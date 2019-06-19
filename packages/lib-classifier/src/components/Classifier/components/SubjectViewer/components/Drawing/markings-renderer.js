import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'

import getDrawingTool from './tools'

function storeMapper (stores) {
  const {
    enableAnnotate,
    enableMove,
    interactionMode,
    setOnPan,
    setOnZoom
  } = stores.classifierStore.subjectViewer

  const {
    addAnnotation,
    currentAnnotations
  } = stores.classifierStore.classifications

  const { 
    tasks
  } = stores.classifierStore.workflowSteps

  const {
    addToStream,
    eventStream,
    active: toolIndex
  } = stores.classifierStore.drawing
  
  return {
    addAnnotation,
    addToStream,
    currentAnnotations,
    enableAnnotate,
    enableMove,
    eventStream,
    interactionMode,
    setOnPan,
    setOnZoom,
    tasks,
    toolIndex
  }
}

@inject(storeMapper)
@observer
class MarkingsRenderer extends Component {
  constructor () {
    super()
  }

  render () {
    const tasks = toJS(this.props.tasks)
    const { currentAnnotations } = this.props
    const exampleAnnotations = pointAnnotationsExample
    const testAnnotations = currentAnnotations.length ? exampleAnnotations.concat(currentAnnotations) : exampleAnnotations

    return (
      <g
        height='100%'
        width='100%'
      >
        {testAnnotations.map((annotation) => {
          annotation._key = annotation._key ? annotation._key : Math.random()
          const taskDescription = tasks[annotation.task]
          if (taskDescription.type === 'drawing') {
            return (
              <g key={annotation._key}>
                {annotation.value.map((mark) =>{
                  mark._key = mark._key ? mark._key : Math.random()

                  const scale = {
                    horizontal: 0.5,
                    vertical: 0.5
                  }

                  const toolDescription = taskDescription.tools[mark.tool]
                  const ToolComponent = getDrawingTool(toolDescription.type)

                  return (
                    <ToolComponent key={mark._key} mark={mark} scale={scale} />
                  )
                })}
              </g>
            )
          }
        })}
      </g>
    )
  }
}

MarkingsRenderer.wrappedComponent.defaultProps = {}

MarkingsRenderer.wrappedComponent.propTypes = {}

export default MarkingsRenderer

const pointAnnotationsExample = [
  {
    "value": [
      {
        "tool": 0,
        "frame": 0,
        "details": [],
        "x": 395.02734375,
        "y": 145.0703125,
      },
      {
        "tool": 0,
        "frame": 0,
        "details": [],
        "x": 146.59765625,
        "y": 292.65234375,
      },
      {
        "tool": 0,
        "frame": 0,
        "details": [],
        "x": 497.76171875,
        "y": 218.875,
      }
    ],
    "task": "T0",
  }
]
