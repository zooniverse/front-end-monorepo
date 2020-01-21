import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React, { Component, createRef, forwardRef } from 'react'
import sinon from 'sinon'
import { PointTool } from '@plugins/drawingTools/models/tools'
import { Mark }from '@plugins/drawingTools/components'
import Point from './Point'

class DrawingStory extends Component {
  render () {
    const { children, mark } = this.props

    return (
      <svg viewBox='0 0 300 400' height={300} width={400}>
        <Mark
          label='Point'
          mark={mark}
        >
          {children}
        </Mark>
      </svg>
    )
  }
}
storiesOf('Drawing tools | Point', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('complete', function () {
    const tool = PointTool.create({
      color: 'red',
      type: 'point'
    })
    const mark = tool.createMark({
      id: 'point1',
      toolType: 'point',
      x: 100,
      y: 120
    })
    return (
      <DrawingStory mark={mark}>
        <Point mark={mark} />
      </DrawingStory>
    )
  })
  .add('active', function () {
    const tool = PointTool.create({
      color: 'red',
      type: 'point'
    })
    const mark = tool.createMark({
      id: 'point1',
      toolType: 'point',      
      x: 100,
      y: 120
    })
    return (
      <DrawingStory mark={mark}>
        <Point active mark={mark} />
      </DrawingStory>
    )
  })
