import asyncStates from '@zooniverse/async-states'

import { MockTask } from '@stories/components'
import HighlighterTask from './HighlighterTask'

export default {
  title: 'Tasks / Highlighter',
  component: HighlighterTask,
  args: {
    dark: false,
    disabled: false,
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

export function Default ({ dark, disabled, isThereTaskHelp, required, subjectReadyState }) {
  const subject = {
    locations: [
      { 'text/plain': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt' }
    ]
  }

  const tasks = {
    T0: {
      highlighterLabels: [
        {
          'color': '#00FF7F',
          'label': 'Species Name'
        },
        {
          'color': '#DCC6E0',
          'label': 'Location'
        },
        {
          'color': '#F5D76E',
          'label': 'Collector Name'
        },
        {
          'color': '#ffa539',
          'label': 'Habitat'
        }
      ],
      required,
      strings: {
        help: 'Highlight the text in the box.',
        instruction: 'Highlight the text',
        'highlighterLabels.0.label': 'Species Name',
        'highlighterLabels.1.label': 'Location',
        'highlighterLabels.2.label': 'Collector Name',
        'highlighterLabels.3.label': 'Habitat'
      },
      taskKey: 'T0',
      type: 'highlighter'
    }
  }
  
  return (
    <MockTask
      dark={dark}
      disabled={disabled}
      isThereTaskHelp={isThereTaskHelp}
      required={required}
      subject={subject}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}
