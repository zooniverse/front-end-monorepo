import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React, { Component, createRef, forwardRef } from 'react'
import sinon from 'sinon'
import { TranscriptionLineTool } from '@plugins/drawingTools/models/tools'
import { Mark } from '@plugins/drawingTools/components'
import TranscriptionLine from './TranscriptionLine'


class DrawingStory extends Component {

  render () {
    const { children, mark } = this.props
    return (
      <svg viewBox='0 0 300 400' height={300} width={400}>
        <Mark
          label='Transcription line'
          mark={mark}
        >
          {children}
        </Mark>
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
  .add('transcribed', function () {
    const tool = TranscriptionLineTool.create({
      color: 'red',
      type: 'transcriptionLine'
    })
    const mark = tool.createMark({
      id: 'transcriptionLine1',
      x1: 10,
      y1: 20,
      x2: 205,
      y2: 15
    })
    return (
      <DrawingStory mark={mark} tool={tool}>
        <TranscriptionLine state='transcribed' mark={mark} />
      </DrawingStory>
    )
  })
  .add('complete', function () {
    const tool = TranscriptionLineTool.create({
      color: 'red',
      type: 'transcriptionLine'
    })
    const mark = tool.createMark({
      id: 'transcriptionLine1',
      x1: 10,
      y1: 20,
      x2: 205,
      y2: 15
    })
    return (
      <DrawingStory mark={mark} tool={tool}>
        <TranscriptionLine state='complete' mark={mark} />
      </DrawingStory>
    )
  })
