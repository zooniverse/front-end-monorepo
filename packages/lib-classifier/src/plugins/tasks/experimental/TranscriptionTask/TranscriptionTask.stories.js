import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { MockTask } from '@helpers'

storiesOf('Tasks / Transcription', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('light theme', function () {
    const tasks = {
      T3: {
        help: 'Underline the line to transcribe with two clicks, then enter in the text transcription.',
        instruction: 'Underline and transcribe',
        taskKey: 'T3',
        tools: [
          {
            help: '',
            label: 'Draw under the text',
            type: 'transcriptionLine'
          }
        ],
        type: 'transcription'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['T3']
    }
    const dark = boolean('Dark theme', false)
    const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
    const isThereTaskHelp = boolean('Enable task help', true)
    return (
      <MockTask
        dark={dark}
        isThereTaskHelp={isThereTaskHelp}
        step={step}
        subjectReadyState={subjectReadyState}
        tasks={tasks}
      />
    )
  })