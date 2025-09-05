import asyncStates from '@zooniverse/async-states'

import { MockTask } from '@stories/components'
import TextFromSubjectTask from './TextFromSubjectTask'

export default {
  title: 'Tasks / TextFromSubject',
  component: TextFromSubjectTask,
  args: {
    subjectReadyState: asyncStates.success
  },
  argTypes: {
    subjectReadyState: {
      options: Object.values(asyncStates),
      type: 'select'
    }
  }
}

const tasks = {
  T0: {
    strings: {
      help: 'Edit the text in the box.',
      instruction: 'Correct the text'
    },
    taskKey: 'T0',
    type: 'textFromSubject'
  }
}
const subject = {
  locations: [{ 
    'text/plain': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt' 
  }]
}

export function Default ({ subjectReadyState }) {
  return (
    <MockTask
      subject={subject}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}
