import { Box } from 'grommet'
import { Provider } from 'mobx-react'

import SingleImageViewer from '@viewers/components/SingleImageViewer'
import { SubjectFactory } from '@test/factories'

export const subject = SubjectFactory.build({
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads-staging.zooniverse.org/subject_location/8bcb0fb1-c701-4b9a-aaa0-c414ed478a58.jpeg'
    }
  ]
})

export const subTasksSnapshot = [
  {
    strings: {
      help: 'Do drawing sub-tasks show help? Should they?',
      instruction: 'Name your favourite fruit.'
    },
    taskKey: 'T0.0',
    type: 'text'
  },
  {
    answers: [{ label: 'yes' }, { label: 'no' }],
    strings: {
      'answers.0.label': 'yes',
      'answers.1.label': 'no',
      help: '',
      question: 'Is it tasty?'
    },
    taskKey: 'T0.1',
    type: 'single'
  },
  {
    answers: [{ label: 'cat' }, { label: 'dog' }, { label: 'bird' }],
    strings: {
      'answers.0.label': 'cat',
      'answers.1.label': 'dog',
      'answers.2.label': 'bird',
      help: '',
      question: 'Select your favourite animals.'
    },
    taskKey: 'T0.2',
    type: 'multiple'
  },
  {
    strings: {
      help: '',
      instruction: 'Pick a vegetable.',
      'selects.0.options.*.0.label': 'carrot',
      'selects.0.options.*.1.label': 'potato',
      'selects.0.options.*.2.label': 'turnip',
      'selects.0.options.*.3.label': 'parsnip'
    },
    taskKey: 'T0.3',
    type: 'dropdown-simple',
    options: [
      'carrot',
      'potato',
      'turnip',
      'parsnip',
    ],
  },
]

export const subtaskStrings = {
  'details.0.help': 'Do drawing sub-tasks show help? Should they?',
  'details.0.instruction': 'Name your favourite fruit.',
  'details.1.help': '',
  'details.1.question': 'Is it tasty?',
  'details.1.answers.0.label': 'yes',
  'details.1.answers.1.label': 'no',
  'details.2.help': '',
  'details.2.question': 'Select your favourite animals.',
  'details.2.answers.0.label': 'cat',
  'details.2.answers.1.label': 'dog',
  'details.2.answers.2.label': 'bird',
  'details.3.help': '',
  'details.3.instruction': 'Pick a vegetable.',
  'details.3.selects.0.options.*.0.label': 'carrot',
  'details.3.selects.0.options.*.1.label': 'potato',
  'details.3.selects.0.options.*.2.label': 'turnip',
  'details.3.selects.0.options.*.3.label': 'parsnip'
}

export function updateStores(
  { activeMark, finished, subtask },
  mockBounds,
  stores
) {
  const [drawingTask] = stores.workflowSteps.activeStepTasks
  const [mark] = drawingTask.marks
  if (mark && finished) {
    drawingTask.setActiveMark(mark.id)
    mark.finish && mark.finish()
  }
  mark?.setSubTaskVisibility(subtask, mockBounds)
  if (mark && activeMark) {
    drawingTask.setActiveMark(mark.id)
  } else {
    drawingTask.setActiveMark(undefined)
  }
}

export function DrawingStory({ stores }) {
  return (
    <Provider classifierStore={stores}>
      <Box height='medium' width='large'>
        <SingleImageViewer
          loadingState={stores.subjects.loadingState}
          subject={stores.subjects.active}
        />
      </Box>
    </Provider>
  )
}
