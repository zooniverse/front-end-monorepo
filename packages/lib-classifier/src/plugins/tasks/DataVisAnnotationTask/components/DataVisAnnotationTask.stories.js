import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { MockTask } from '@helpers'

storiesOf('Tasks / Data Visualization Annotation', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('light theme', function () {
    const tasks = {
      T4: {
        instruction: 'Do you spot a transit?',
        taskKey: 'T4',
        tools: [
          {
            help: '',
            label: 'Transit?',
            type: 'graph2dRangeX'
          }
        ],
        type: 'dataVisAnnotation'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['T4']
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