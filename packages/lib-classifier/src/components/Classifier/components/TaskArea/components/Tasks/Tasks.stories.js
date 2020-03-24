import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { Tasks } from './Tasks'
import RootStore from '@store/RootStore'
import Step from '@store/Step'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'

function MockTask ({ dark, loadingState, subjectReadyState, step }) {
  const steps = {
    S1: step
  }
  const store = RootStore
  .create({
    subjectViewer: { loadingState: subjectReadyState },
    workflows: { loadingState },
    workflowSteps: { active: 'S1', steps }
  })
  const mockSubject = SubjectFactory.build()
  const mockWorkflow = WorkflowFactory.build()
  const mockProject = ProjectFactory.build()
  store.classifications.createClassification(mockSubject, mockWorkflow, mockProject)
  const theme = Object.assign({}, zooTheme, { dark })
  return (
    <Provider classifierStore={store}>
      <Grommet 
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={theme}
        themeMode={(dark) ? 'dark' : 'light'}
      >
        <Box
          background={{
            dark: 'dark-3',
            light: 'neutral-6'
          }}
          pad='1em'
          width='380px'
        >
          <Tasks />
        </Box>
      </Grommet>
    </Provider>
  )
}

storiesOf('Tasks', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('loading', function () {
    const tasks = [{
      answers: [{ label: 'yes' }, { label: 'no' }],
      question: 'is there a cat?',
      taskKey: 'init',
      type: 'single'
    }]
    const step = {
      stepKey: 'S1',
      taskKeys: ['init'],
      tasks
    }
    const dark = boolean('Dark theme', false)
    return (
      <MockTask
        dark={dark}
        loadingState={asyncStates.loading}
        step={step}
        subjectReadyState={asyncStates.loading}
        tasks={tasks}
      />
    )
  })
  .add('loading', function () {
    const tasks = [{
      answers: [{ label: 'yes' }, { label: 'no' }],
      question: 'is there a cat?',
      taskKey: 'init',
      type: 'single'
    }]
    const step = {
      stepKey: 'S1',
      taskKeys: ['init'],
      tasks
    }
    const dark = boolean('Dark theme', false)
    return (
      <MockTask
        dark={dark}
        loadingState={asyncStates.loading}
        step={step}
        subjectReadyState={asyncStates.loading}
        tasks={tasks}
      />
    )
  })
  .add('error', function () {
    const tasks = [{
      answers: [{ label: 'yes' }, { label: 'no' }],
      question: 'is there a cat?',
      taskKey: 'init',
      type: 'single'
    }]
    const step = {
      stepKey: 'S1',
      taskKeys: ['init'],
      tasks
    }
    const dark = boolean('Dark theme', false)
    return (
      <MockTask
        dark={dark}
        loadingState={asyncStates.error}
        step={step}
        subjectReadyState={asyncStates.error}
        tasks={tasks}
      />
    )
  })
  .add('single task', function () {
    const tasks = [{
      answers: [{ label: 'yes' }, { label: 'no' }],
      help: 'Choose an answer from the choices given, then press Done.',
      question: 'Is there a cat?',
      required: boolean('Required', false),
      taskKey: 'init',
      type: 'single'
    }]
    const step = {
      stepKey: 'S1',
      taskKeys: ['init'],
      tasks
    }
    const dark = boolean('Dark theme', false)
    return (
      <MockTask
        dark={dark}
        loadingState={asyncStates.success}
        step={step}
        subjectReadyState={asyncStates.success}
        tasks={tasks}
      />
    )
  })
  .add('multiple tasks', function () {
    const tasks = [
      {
        answers: [{ label: 'yes' }, { label: 'no' }],
        help: 'Choose an answer from the choices given, then press Done.',
        question: 'Is there a cat?',
        required: boolean('Required', false),
        taskKey: 'init',
        type: 'single'
      },
      {
        answers: [{ label: 'sleeping' }, { label: 'playing' }, { label: 'looking indifferent' }],
        help: 'Pick as many answers as apply, then press Done.',
        question: 'What is it doing?',
        required: false,
        taskKey: 'T1',
        type: 'multiple'
      }
    ]
    const step = Step.create({
      stepKey: 'S1',
      taskKeys: ['init', 'T1'],
      tasks
    })
    const dark = boolean('Dark theme', false)
    return (
      <MockTask
        dark={dark}
        loadingState={asyncStates.success}
        step={step}
        subjectReadyState={asyncStates.success}
        tasks={tasks}
      />
    )
  })
  .add('text', function () {
    const tasks = [
      {
        help: 'Type something into the text box.',
        instruction: 'Type something here',
        taskKey: 'T0',
        text_tags: ['insertion', 'deletion'],
        type: 'text'
      }
    ]
    const step = Step.create({
      stepKey: 'S1',
      taskKeys: ['T0'],
      tasks
    })
    const dark = boolean('Dark theme', false)
    return (
      <MockTask
        dark={dark}
        loadingState={asyncStates.success}
        step={step}
        subjectReadyState={asyncStates.success}
        tasks={tasks}
      />
    )
  })
  .add('drawing', function () {
    const tasks = [
      {
        help: 'Draw on the image.',
        instruction: 'Draw something',
        taskKey: 'T0',
        tools: [
          {
            color: zooTheme.global.colors['drawing-red'],
            help: '',
            label: 'Draw a line',
            type: 'line'
          }, {
            color: zooTheme.global.colors['drawing-blue'],
            help: '',
            label: 'Point please.',
            min: 1,
            max: 2,
            type: 'point',
          }, {
            color: zooTheme.global.colors['drawing-green'],
            help: '',
            label: 'Draw under the text',
            type: 'transcriptionLine'
          }, {
            color: zooTheme.global.colors['drawing-orange'],
            help: '',
            label: 'Draw a rectangle',
            type: 'rectangle',
          }, {
            color: zooTheme.global.colors['drawing-yellow'],
            help: '',
            label: 'Draw an ellipse',
            type: 'ellipse',
          }
        ],
        type: 'drawing'
      }
    ]
    const step = Step.create({
      stepKey: 'S1',
      taskKeys: ['T0'],
      tasks
    })
    const dark = boolean('Dark theme', false)
    return (
      <MockTask
        dark={dark}
        loadingState={asyncStates.success}
        step={step}
        subjectReadyState={asyncStates.success}
        tasks={tasks}
      />
    )
  })
  .add('transcription', function () {
    const tasks = [
      {
        help: 'Underline the line to transcribe with two clicks, then enter in the text transcription.',
        instruction: 'Underline and transcribe',
        taskKey: 'T0',
        tools: [
          {
            help: '',
            label: 'Draw under the text',
            type: 'transcriptionLine'
          }
        ],
        type: 'transcription'
      }
    ]
    const step = Step.create({
      stepKey: 'S1',
      taskKeys: ['T0'],
      tasks
    })
    const dark = boolean('Dark theme', false)
    return (
      <MockTask
        dark={dark}
        loadingState={asyncStates.success}
        step={step}
        subjectReadyState={asyncStates.success}
        tasks={tasks}
      />
    )
  })