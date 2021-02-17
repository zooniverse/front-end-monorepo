import { withKnobs, boolean, radios, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { MockTask } from '@helpers'

storiesOf('Tasks / Single Choice Question', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('light theme', function () {
    const tasks = {
      init: {
        answers: [{ label: 'yes' }, { label: 'no' }],
        help: 'Choose an answer from the choices given, then press Done.',
        question: 'Is there a cat?',
        required: radios('Required', { true: 'true', false: '' }, ''),
        taskKey: 'init',
        type: 'single'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['init']
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