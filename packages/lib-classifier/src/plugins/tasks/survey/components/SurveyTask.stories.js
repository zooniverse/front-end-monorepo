import { Box } from 'grommet'
import React from 'react'
import asyncStates from '@zooniverse/async-states'

import { task } from '@plugins/tasks/survey/mock-data'
import { MockTask } from '@stories/components'

import SurveyTask from '@plugins/tasks/survey'

export default {
  title: 'Tasks / Survey',
  component: SurveyTask,
  args: {
    dark: false,
    subjectReadyState: asyncStates.success
  }
}

export const Default = ({
  dark,
  subjectReadyState
}) => {
  const tasks = { T0: task }

  return (
    <Box
      fill='horizontal'
      align='end'
    >
      <MockTask
        dark={dark}
        isThereTaskHelp={false}
        subjectReadyState={subjectReadyState}
        tasks={tasks}
      />
    </Box>
  )
}

export const NoFilters = ({
  dark,
  subjectReadyState
}) => {
  const taskWithoutCharacteristics = Object.assign({}, task, { characteristics: {} })
  const tasks = { T0: taskWithoutCharacteristics }

  return (
    <Box
      fill='horizontal'
      align='end'
    >
      <MockTask
        dark={dark}
        isThereTaskHelp={false}
        subjectReadyState={subjectReadyState}
        tasks={tasks}
      />
    </Box>
  )
}
