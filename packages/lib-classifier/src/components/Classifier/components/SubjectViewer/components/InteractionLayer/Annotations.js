import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { Component as Point } from './drawing-tools/Point'

function storeMapper (stores) {
  const { classification } = stores.classifierStore
  return {
    classification
  }
}

const annotationMap = {
  point: Point
}

const annotationMapper = annotation => annotation && annotation.type 
  ? annotationMap[annotation.type] 
  : null

@inject(storeMapper)
@observer
class Annotations extends React.Component {

  render () {
    const answer = this.props.classification.active.answer
    if (!answer) return null
    
    const annotations = [answer].map(annotation => {
      const Component = annotationMapper(annotation)
      return <Component key={`${annotation.x}${annotation.y}`} {...annotation} />
    })
    
    return (
      <g name="Annotations">
        {annotations}
      </g>
    )
  }
}

Annotations.defaultProps = {
  annotations: []
}

export default Annotations
