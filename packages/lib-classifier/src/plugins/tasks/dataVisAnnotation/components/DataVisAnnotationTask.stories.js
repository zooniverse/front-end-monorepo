import asyncStates from '@zooniverse/async-states'
import React from 'react'
import { MockTask } from '@stories/components'
import DataVisAnnotationTask from './DataVisAnnotationTask'

export default {
  title: 'Tasks / Data Visualization Annotation',
  component: DataVisAnnotationTask,
  args: {
    dark: false,
    isThereTaskHelp: true,
    required: false,
    subjectReadyState: asyncStates.success
  },
  argTypes: {
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

export function LightTheme({ dark, isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    T4: {
      instruction: 'Do you spot a transit?',
      required,
      taskKey: 'T4',
      tools: [
        {
          help: '',
          label: 'Transit?',
          type: 'graph2dRangeX'
        }
      ],
      type: 'dataVisAnnotation'
    }
  }
  return (
    <MockTask
      dark={dark}
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}
