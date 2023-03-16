import asyncStates from '@zooniverse/async-states'

import { MockTask } from '@stories/components'
import HighlighterTask from './HighlighterTask'

export default {
  title: 'Tasks / Highlighter',
  component: HighlighterTask,
  args: {
    dark: false,
    isThereTaskHelp: true,
    required: false,
    subjectReadyState: asyncStates.success
  },
  argTypes: {
    subjectReadyState: {
      options: Object.keys(asyncStates),
      type: 'select'
    }
  }
}

export function Default ({ dark, isThereTaskHelp, required, subjectReadyState }) {
  const subject = {
    locations: [
      { 'text/plain': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt' }
    ]
  }

  const tasks = {
    T0: {
      required,
      strings: {
        help: 'Edit the text in the box.',
        instruction: 'Highlight the text'
      },
      taskKey: 'T0',
      type: 'highlighter'
    }
  }
  
  return (
    <MockTask
      dark={dark}
      isThereTaskHelp={isThereTaskHelp}
      required={required}
      subject={subject}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}
