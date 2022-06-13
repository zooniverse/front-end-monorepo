import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'

import SingleImageViewer from '@viewers/components/SingleImageViewer'
import { SubjectFactory } from '@test/factories'

export const subject = SubjectFactory.build({
  locations: [
    { 'image/jpeg': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/8bcb0fb1-c701-4b9a-aaa0-c414ed478a58.jpeg' }
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
    answers: [{ label: "yes" }, { label: "no" }],
    strings: {
      'answers.0.label': 'yes',
      'answers.1.label': 'no',
      help: '',
      question: 'Is it tasty?',
    },
    taskKey: 'T0.1',
    type: 'single'
  },
  {
    answers: [{ label: "cat" }, { label: "dog" }, { label: "bird" }],
    strings: {
      'answers.0.label': 'cat',
      'answers.1.label': 'dog',
      'answers.2.label': 'bird',
      help: '',
      question: 'Select your favourite animals.'
    },
    taskKey: 'T0.2',
    type: 'multiple'
  }
]

export function updateStores({ activeMark, finished, subtask }, mockBounds, stores) {
  const [ drawingTask ] = stores.workflowSteps.activeStepTasks
  const [ mark ] = drawingTask.marks
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
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={zooTheme}
        themeMode='light'
      >
        <Box height='medium' width='large'>
          <SingleImageViewer
            loadingState={stores.subjects.loadingState}
            subject={stores.subjects.active}
          />
        </Box>
      </Grommet>
    </Provider>
  )
}
