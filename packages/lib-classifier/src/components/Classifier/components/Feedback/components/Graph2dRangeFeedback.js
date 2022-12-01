import { brushX } from 'd3-brush'
import { select } from 'd3-selection'
import { toJS } from 'mobx'
import { useCallback } from 'react';

import { withStores } from '@helpers'

import LightCurveViewer from '../../SubjectViewer/components/LightCurveViewer'

function storeMapper(classifierStore) {
  const {
    classifications: {
      currentAnnotations: annotations
    },
    feedback: {
      applicableRules,
      showModal: feedback
    },
    subjects: {
      active: subject
    }
  } = classifierStore

  return {
    annotations,
    applicableRules,
    feedback,
    subject
  }
}

function Graph2dRangeFeedback({
  annotations = [],
  applicableRules = [],
  feedback = false,
  subject = null
}) {

  const drawFeedbackBrushes = useCallback(function (d3annotationsLayer, repositionBrush) {
    const annotationBrushes = []
    annotations.forEach(annotation => {
      const { value } = toJS(annotation)
      value.forEach((marking, i) => {
        const markingBrush = {
          id: i,
          brush: brushX(),
          maxX: (marking.x + (marking.width / 2)),
          minX: (marking.x - (marking.width / 2))
        }
        annotationBrushes.push(markingBrush)
      })
    })

    const ruleBrushes = applicableRules.map(rule => {
      return {
        id: rule.id,
        brush: brushX(),
        maxX: (parseFloat(rule.x) + (parseFloat(rule.width) / 2) + parseFloat(rule.tolerance)),
        minX: (parseFloat(rule.x) - (parseFloat(rule.width) / 2) - parseFloat(rule.tolerance)),
        success: rule.success
      }
    })

    const feedbackBrushes = annotationBrushes.concat(ruleBrushes)

    // Join the D3 brush objects with our internal annotationBrushes array
    const brushSelection = d3annotationsLayer
      .selectAll('.brush')
      .data(feedbackBrushes, (d) => d.id)

    // Set up new brushes
    brushSelection.enter()
      .insert('g', '.brush')
      .attr('class', 'brush')
      .attr('id', (brush) => (`brush-${brush.id}`))
      .each(function applyBrushLogic(feedbackBrush) { // Don't use ()=>{}
        feedbackBrush.brush(select(this)) // Apply the brush logic to the <g.brush> element (i.e. 'this')
      })

    // Reposition/re-draw brushes
    feedbackBrushes.forEach((feedbackBrush) => {
      const d3brush = d3annotationsLayer.select(`#brush-${feedbackBrush.id}`)
      d3brush
        .attr('class', 'brush')
        .selectAll('.selection')
        .style('fill', () => {
          if (feedbackBrush.success === true) {
            return 'green'
          } else if (feedbackBrush.success === false) {
            return 'red'
          } else {
            return 'white'
          }
        })

      repositionBrush(feedbackBrush, d3brush)
    })
  }, [annotations, applicableRules])

  return (
    <LightCurveViewer
      drawFeedbackBrushes={drawFeedbackBrushes}
      feedback={feedback}
      subject={subject}
      subjectId={subject.id}
    />
  )
}

export default withStores(Graph2dRangeFeedback, storeMapper)
export { Graph2dRangeFeedback }
