import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { MockTask } from '@helpers'

storiesOf('Tasks / Text', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
.add('default', function () {
    const tasks = {
      T0: {
        help: 'Type something into the text box.',
        instruction: 'Type something here',
        taskKey: 'T0',
        text_tags: ['insertion', 'deletion'],
        type: 'text'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['T0']
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
  .add('with suggestions', function () {
    const tasks = {
      T0: {
        help: 'Type something into the text box.',
        instruction: 'Type something here',
        taskKey: 'T0',
        text_tags: ['insertion', 'deletion'],
        type: 'text'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['T0']
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
        subTaskPreviousAnnotationValues={['a', 'b', 'c']}
        tasks={tasks}
      />
    )
  })