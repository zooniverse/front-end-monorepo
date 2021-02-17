import { Box, Grommet } from 'grommet'
import { observer } from 'mobx-react'
import React from 'react'
import { Tasks } from '../../components/Classifier/components/TaskArea/components/Tasks/Tasks'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'

const ObservedTasks = observer(Tasks)

export default function MockTask(props) {
  const { dark, subjectViewer, ...taskProps } = props
  switch (taskProps.subjectReadyState) {
    case asyncStates.error: {
      subjectViewer.onError()
      break
    }
    case asyncStates.loading: {
      subjectViewer.resetSubject()
      break
    }
    case asyncStates.success: {
      subjectViewer.onSubjectReady()
      break
    }
  }

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={Object.assign({}, zooTheme, { dark })}
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
        <ObservedTasks
          {...taskProps}
        />
      </Box>
    </Grommet>
  )
}