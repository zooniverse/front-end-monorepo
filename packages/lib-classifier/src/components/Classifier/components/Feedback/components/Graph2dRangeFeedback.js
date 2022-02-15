import * as d3 from 'd3'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'

import LightCurveViewer from '../../SubjectViewer/components/LightCurveViewer'

function storeMapper (stores) {
  const annotations = stores.classifierStore.classifications.currentAnnotations
  const {
    applicableRules,
    showModal: feedback
  } = stores.classifierStore.feedback
  const {
    active: subject
  } = stores.classifierStore.subjects

  return {
    annotations,
    applicableRules,
    feedback,
    subject
  }
}

// Noting that mobx decorators are outdated https://michel.codes/blogs/mobx6
@inject(storeMapper)
@observer
class Graph2dRangeFeedback extends Component {
  constructor () {
    super()

    this.drawFeedbackBrushes = this.drawFeedbackBrushes.bind(this)
  }

  drawFeedbackBrushes (d3annotationsLayer, repositionBrush) {
    const annotationBrushes = []
    this.props.annotations.forEach(annotation => {
      const { value } = toJS(annotation)
      value.forEach((marking, i) => {
        const markingBrush = {
          id: i,
          brush: d3.brushX(),
          maxX: (marking.x + (marking.width / 2)),
          minX: (marking.x - (marking.width / 2))
        }
        annotationBrushes.push(markingBrush)
      })
    })

    const ruleBrushes = []
    this.props.applicableRules.forEach(rule => {
      const ruleBrush = {
        id: rule.id,
        brush: d3.brushX(),
        maxX: (parseFloat(rule.x) + (parseFloat(rule.width) / 2) + parseFloat(rule.tolerance)),
        minX: (parseFloat(rule.x) - (parseFloat(rule.width) / 2) - parseFloat(rule.tolerance)),
        success: rule.success
      }
      ruleBrushes.push(ruleBrush)
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
      .each(function applyBrushLogic (feedbackBrush) { // Don't use ()=>{}
        feedbackBrush.brush(d3.select(this)) // Apply the brush logic to the <g.brush> element (i.e. 'this')
      })

    // Modify brush fill color...
    brushSelection
      .each(function fill (feedbackBrush) { // Don't use ()=>{}
        d3.select(this)
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
      })

    // Reposition/re-draw brushes
    feedbackBrushes.forEach((feedbackBrush) => {
      const d3brush = d3annotationsLayer.select(`#brush-${feedbackBrush.id}`)

      repositionBrush(feedbackBrush, d3brush)
    })
  }

  render () {
    const { feedback, subject } = this.props
    return (
      <LightCurveViewer
        drawFeedbackBrushes={this.drawFeedbackBrushes}
        feedback={feedback}
        subject={subject}
        subjectId={subject.id}
      />
    )
  }
}

export default Graph2dRangeFeedback
