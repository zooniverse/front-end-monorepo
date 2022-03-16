import asyncStates from '@zooniverse/async-states'
import React from 'react'

import { MockTask } from '@stories/components'
import TextFromSubjectTask from './TextFromSubjectTask'

export default {
  title: 'Tasks / TextFromSubject',
  component: TextFromSubjectTask,
  args: {
    contentLoadingState: asyncStates.success,
    dark: false,
    isThereTaskHelp: true,
    required: false,
    subjectReadyState: asyncStates.success
  },
  argTypes: {
    contentLoadingState: {
      control: {
        type: 'select',
        options: asyncStates
      }
    },
    subjectReadyState: {
      control: {
        type: 'select',
        options: asyncStates
      }
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Default ({ contentLoadingState, dark, isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    T0: {
      help: 'Edit the text in the box.',
      instruction: 'Correct the text',
      required,
      taskKey: 'T0',
      type: 'textFromSubject'
    }
  }
  const subject = {
    content: 'Herbarium of the University of North Carolina\nSOUTH CAROLINA\nCharleston County\nGnaphalium peregrinum Fern,\nrailroad right-of-way, Johns Island Station on\nCounty Rt. 20 (wes t of Charleston.\nHarry E. Ahles 22002 April 2, 1957\nwith John G. Haesloop\nCollected for the “Flora of the Carolinas"',
    contentLoadingState,
    locations: [
      { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
    ]
  }

  return (
    <MockTask
      dark={dark}
      isThereTaskHelp={isThereTaskHelp}
      subject={subject}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}
