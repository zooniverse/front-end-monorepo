import { withKnobs, boolean, radios, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { MockTask } from '@helpers'

storiesOf('Tasks / Simple Dropdown Task', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('light theme', function () {
    const simpleDropdownTask = {
      instruction: 'Choose your favourite colour',
      allowCreate: false,
      options: [
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'White',
        'Black',
      ],
      required: radios('Required', { true: 'true', false: '' }, ''),
      taskKey: 'init',
      type: 'dropdown-simple',
    }
    const tasks = {
      init: simpleDropdownTask
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
