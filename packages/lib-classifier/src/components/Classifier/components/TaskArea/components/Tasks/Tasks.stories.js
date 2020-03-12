import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { types } from 'mobx-state-tree'
import React from 'react'
import sinon from 'sinon'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { Tasks } from './Tasks'
import ClassificationStore from '@store/ClassificationStore'
import WorkflowStepStore from '@store/WorkflowStepStore'
import Step from '@store/Step'
import taskRegistry from '@plugins/tasks'

const SingleChoiceTask = taskRegistry.get('single').TaskModel
const MultipleChoiceTask = taskRegistry.get('multiple').TaskModel
const TextTask = taskRegistry.get('text').TaskModel

function MockTask ({ dark, isThereTaskHelp, subjectReadyState, step, zooTheme }) {
  const background = dark
    ? zooTheme.global.colors['dark-1']
    : zooTheme.global.colors['light-1']
  const classifications = ClassificationStore.create()
  const steps = {
    S1: step
  }
  const store = types.model('MockStore', {
    classifications: ClassificationStore,
    workflowSteps: WorkflowStepStore
  })
  .create({
    classifications,
    workflowSteps: WorkflowStepStore.create({ steps })
  })
  const mockSubject = {
    id: 'subject',
    metadata: {}
  }
  const mockWorkflow = {
    id: 'workflow',
    version: '1.0'
  }
  const mockProject = {
    id: 'project'
  }
  classifications.createClassification(mockSubject, mockWorkflow, mockProject)
  step.tasks.forEach(task => classifications.addAnnotation(task))
  const classification = classifications.active
  return (
    <Provider classifierStore={store}>
      <Grommet theme={Object.assign({}, zooTheme, { dark })}>
        <Box
          background={background}
          pad='1em'
          width='380px'
        >
          <Tasks
            addAnnotation={classifications.addAnnotation}
            classification={classification}
            isThereTaskHelp={isThereTaskHelp}
            loadingState={asyncStates.success}
            step={step}
            subjectReadyState={subjectReadyState}
            tasks={step.tasks}
          />
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
    return (
      <Provider classifierStore={{}}>
        <Grommet theme={zooTheme}>
          <Tasks
            loadingState={asyncStates.loading}
          />
        </Grommet>
      </Provider>
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
    const step = Step.create({
      stepKey: 'S1',
      taskKeys: ['init'],
      tasks
    })
    const dark = boolean('Dark theme', false)
    const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
    const isThereTaskHelp = boolean('Enable task help', true)
    return (
      <MockTask
        dark={dark}
        isThereTaskHelp={isThereTaskHelp}
        loadingState={asyncStates.success}
        step={step}
        subjectReadyState={subjectReadyState}
        tasks={tasks}
        zooTheme={zooTheme}
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
    const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
    const isThereTaskHelp = boolean('Enable task help', true)
    return (
      <MockTask
        dark={dark}
        isThereTaskHelp={isThereTaskHelp}
        loadingState={asyncStates.success}
        step={step}
        subjectReadyState={subjectReadyState}
        tasks={tasks}
        zooTheme={zooTheme}
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
    const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
    const isThereTaskHelp = boolean('Enable task help', true)
    return (
      <MockTask
        dark={dark}
        isThereTaskHelp={isThereTaskHelp}
        loadingState={asyncStates.success}
        step={step}
        subjectReadyState={subjectReadyState}
        tasks={tasks}
        zooTheme={zooTheme}
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
    const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
    const isThereTaskHelp = boolean('Enable task help', true)
    return (
      <MockTask
        dark={dark}
        isThereTaskHelp={isThereTaskHelp}
        loadingState={asyncStates.success}
        step={step}
        subjectReadyState={subjectReadyState}
        tasks={tasks}
        zooTheme={zooTheme}
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
    const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
    const isThereTaskHelp = boolean('Enable task help', true)
    return (
      <MockTask
        dark={dark}
        isThereTaskHelp={isThereTaskHelp}
        loadingState={asyncStates.success}
        step={step}
        subjectReadyState={subjectReadyState}
        tasks={tasks}
        zooTheme={zooTheme}
      />
    )
  })