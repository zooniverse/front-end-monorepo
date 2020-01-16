import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React, { Component, createRef, forwardRef } from 'react'
import sinon from 'sinon'
import { LineTool } from '@plugins/drawingTools/models/tools'
import { DrawingToolRoot }from '@plugins/drawingTools/components'
import Line from './Line'

class DrawingStory extends Component {
  render () {
    const { children, mark } = this.props

    return (
      <svg viewBox='0 0 300 400' height={300} width={400}>
        <DrawingToolRoot
          label='Line'
          mark={mark}
        >
          {children}
        </DrawingToolRoot>
      </svg>
    )
  }
}
storiesOf('Drawing tools | Line', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('complete', function () {
    const tool = LineTool.create({
      color: 'red',
      type: 'line'
    })
    const mark = tool.createMark({
      id: 'line1',
      toolType: 'line',
      x1: 10,
      y1: 120,
      x2: 205,
      y2: 15
    })
    return (
      <DrawingStory mark={mark}>
        <Line mark={mark} />
      </DrawingStory>
    )
  })
  .add('active', function () {
    const tool = LineTool.create({
      color: 'red',
      type: 'line'
    })
    const mark = tool.createMark({
      id: 'line1',
      toolType: 'line',      
      x1: 10,
      y1: 120,
      x2: 205,
      y2: 15
    })
    return (
      <DrawingStory mark={mark}>
        <Line active mark={mark} />
      </DrawingStory>
    )
  })
