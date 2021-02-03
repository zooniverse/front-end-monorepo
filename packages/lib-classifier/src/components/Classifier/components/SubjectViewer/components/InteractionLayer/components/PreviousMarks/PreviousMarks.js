import React from 'react'
import PropTypes from 'prop-types'
import DrawingToolMarks from '../DrawingToolMarks'
import SHOWN_MARKS from '@helpers/shownMarks'

function PreviousMarks (props) {
  const {
    frame = 0,
    previousAnnotations = [],
    scale = 1,
    shownMarks = 'ALL'
  } = props
  const marksToShow = shownMarks === SHOWN_MARKS.ALL || shownMarks === SHOWN_MARKS.USER

  if (previousAnnotations?.length > 0 && marksToShow) {
    // Wrapping the array in an react fragment because enzyme errors otherwise 
    // React v16 allows this, though. 
    return (
      <>
        {previousAnnotations.map((annotation) => {
          const annotationValuesPerFrame = annotation.value.filter(value => value.frame === frame)
          return (
            <g
              key={annotation.task}
              pointerEvents='none'
            >
              <DrawingToolMarks
                marks={annotationValuesPerFrame}
                scale={scale}
              />
            </g>
          )
        })}
      </>
    )
  }

  return null
}

PreviousMarks.propTypes = {
  frame: PropTypes.number,
  previousAnnotations: PropTypes.array,
  scale: PropTypes.number,
  shownMarks: PropTypes.string
}

export default PreviousMarks