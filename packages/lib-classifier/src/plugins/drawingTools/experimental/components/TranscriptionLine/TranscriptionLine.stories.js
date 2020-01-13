import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React, { Component, createRef, forwardRef } from 'react'
import sinon from 'sinon'
import { TranscriptionLineTool } from '@plugins/drawingTools/models/tools'
import { DrawingToolRoot } from '@plugins/drawingTools/components'
import TranscriptionLine from './TranscriptionLine'

class DrawingStory extends Component {
  render () {
    const { children, mark, tool } = this.props

    return (
      <svg viewBox='0 0 300 400' height={300} width={400}>
        <DrawingToolRoot
          label='Transcription line'
          mark={mark}
          tool={tool}
        >
          {React.cloneElement(children)}
        </DrawingToolRoot>
      </svg>
    )
  }
}
storiesOf('Drawing tools | Transcription Line', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('complete', function () {
    const tool = TranscriptionLineTool.create({
      color: 'red',
      type: 'transcriptionLine'
    })
    const mark = tool.createMark({
      id: 'transcriptionLine1',
      toolType: 'transcriptionLine',
      x1: 10,
      y1: 20,
      x2: 205,
      y2: 15
    })
    mark.finish()
    return (
      <DrawingStory mark={mark} tool={tool}>
        <TranscriptionLine mark={mark} />
      </DrawingStory>
    )
  })
  .add('active', function () {
    const tool = TranscriptionLineTool.create({
      color: 'red',
      type: 'transcriptionLine'
    })
    const mark = tool.createMark({
      id: 'transcriptionLine1',
      toolType: 'transcriptionLine',      
      x1: 10,
      y1: 20,
      x2: 205,
      y2: 15
    })
    mark.finish()
    return (
      <DrawingStory mark={mark} tool={tool}>
        <TranscriptionLine active mark={mark} />
      </DrawingStory>
    )
  })
  .add('unfinished', function () {
    const tool = TranscriptionLineTool.create({
      color: 'red',
      type: 'transcriptionLine'
    })
    const mark = tool.createMark({
      id: 'transcriptionLine1',
      toolType: 'transcriptionLine',      
      x1: 10,
      y1: 20,
      x2: 205,
      y2: 15
    })
    return (
      <DrawingStory mark={mark} tool={tool}>
        <TranscriptionLine active mark={mark} />
      </DrawingStory>
    )
  })
