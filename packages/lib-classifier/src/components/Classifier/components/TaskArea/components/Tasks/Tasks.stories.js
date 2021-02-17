import { withKnobs, boolean, radios, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { MockTask } from '@helpers'

storiesOf('Tasks / General', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('loading', function () {
    return (
      <MockTask
        loadingState={asyncStates.loading}
      />
    )
  })
  .add('error', function () {
    return (
      <MockTask
        loadingState={asyncStates.error}
      />
    )
  })
  .add('multiple tasks', function () {
    const tasks = {
      init: {
        answers: [{ label: 'yes' }, { label: 'no' }],
        help: 'Choose an answer from the choices given, then press Done.',
        question: 'Is there a cat?',
        required: radios('Required', { true: 'true', false: '' }, ''),
        taskKey: 'init',
        type: 'single'
      },
      T1: {
        answers: [{ label: 'sleeping' }, { label: 'playing' }, { label: 'looking indifferent' }],
        help: 'Pick as many answers as apply, then press Done.',
        question: 'What is it doing?',
        required: radios('Required', { true: 'true', false: '' }, ''),
        taskKey: 'T1',
        type: 'multiple'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['init', 'T1']
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