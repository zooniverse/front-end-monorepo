import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React, { Component, createRef, forwardRef } from 'react'
import sinon from 'sinon'
import { RectangleTool } from '@plugins/drawingTools/models/tools'
import { Mark }from '@plugins/drawingTools/components'
import Rectangle from './Rectangle'

class DrawingStory extends Component {
  render () {
    const { children, mark } = this.props

    return (
      <svg viewBox='0 0 300 400' height={300} width={400}>
        <Mark
          label='Rectangle'
          mark={mark}
        >
          {children}
        </Mark>
      </svg>
    )
  }
}
storiesOf('Drawing tools | Rectangle', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('complete', function () {
    const tool = RectangleTool.create({
      color: 'blue',
      type: 'rectangle'
    })
    const mark = tool.createMark({
      id: 'rect1',
      toolType: 'rectangle',
      x_center: 200,
      y_center: 150,
      width: 100,
      height: 80,
    })
    return (
      <DrawingStory mark={mark}>
        <Rectangle mark={mark} scale={1} />
      </DrawingStory>
    )
  })
  .add('active', function () {
    const tool = RectangleTool.create({
      color: 'blue',
      type: 'rectangle'
    })
    const mark = tool.createMark({
      id: 'rect1',
      toolType: 'rectangle',      
      x_center: 200,
      y_center: 150,
      width: 100,
      height: 80,
    })
    return (
      <DrawingStory mark={mark}>
        <Rectangle active mark={mark} scale={1} />
      </DrawingStory>
    )
  })
