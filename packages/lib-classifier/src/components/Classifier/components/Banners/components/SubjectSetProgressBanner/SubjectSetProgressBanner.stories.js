import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import SubjectSetProgressBanner from './SubjectSetProgressBanner'
// import readme from '../../README.md'
import { SubjectFactory, SubjectSetFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

function buildMocks({ already_seen, metadata = { ['#priority']: 37 }, retired }) {
  const subjectSnapshot = SubjectFactory.build({
    already_seen,
    metadata,
    retired
  })
  const subjectSetSnapshot = SubjectSetFactory.build()
  const workflowSnapshot = WorkflowFactory.build({
    grouped: true,
    prioritized: true,
    subjectSet: subjectSetSnapshot.id
  })
  const store = mockStore({ subject: subjectSnapshot, subjectSet: subjectSetSnapshot, workflow: workflowSnapshot })

  const subject = store.subjects.active
  const workflow = store.workflows.resources.get(workflowSnapshot.id)
  return { subject, workflow }
}

export default {
  title: 'Banners / Subject Set Progress Banner',
  component: SubjectSetProgressBanner,
  // parameters: {
  //   docs: {
  //     description: {
  //       component: readme
  //     }
  //   }
  // }
}

export function Default({ already_seen, dark, retired }) {
  const { subject, workflow } = buildMocks({ already_seen, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
        <SubjectSetProgressBanner
          subject={subject}
          workflow={workflow}
        />
        <img src="https://placekitten.com/800/400" alt='placeholder' />
      </Box>
    </Grommet>
  )
}

Default.args = {
  already_seen: false,
  dark: false,
  retired: false
}

export function WithVisiblePriorityMetadata({ already_seen, dark, retired }) {
  const metadata = { priority: 37 }
  const { subject, workflow } = buildMocks({ already_seen, metadata, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
        <SubjectSetProgressBanner
          subject={subject}
          workflow={workflow}
        />
        <img src="https://placekitten.com/800/400" alt='placeholder' />
      </Box>
    </Grommet>
  )
}

export function WithVisiblePriorityMetadataAndRetired({ already_seen, dark, retired }) {
  const metadata = { priority: 37 }
  const { subject, workflow } = buildMocks({ already_seen, metadata, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
        <SubjectSetProgressBanner
          subject={subject}
          workflow={workflow}
        />
        <img src="https://placekitten.com/800/400" alt='placeholder' />
      </Box>
    </Grommet>
  )
}

WithVisiblePriorityMetadataAndRetired.args = {
  already_seen: false,
  dark: false,
  retired: true
}

export function WithVisiblePriorityMetadataAndAlreadySeen({ already_seen, dark, retired }) {
  const metadata = { priority: 37 }
  const { subject, workflow } = buildMocks({ already_seen, metadata, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
        <SubjectSetProgressBanner
          subject={subject}
          workflow={workflow}
        />
        <img src="https://placekitten.com/800/400" alt='placeholder' />
      </Box>
    </Grommet>
  )
}

WithVisiblePriorityMetadataAndAlreadySeen.args = {
  already_seen: true,
  dark: false,
  retired: false
}

export function WithRetiredSubject({ already_seen, dark, retired }) {
  const { subject, workflow } = buildMocks({ already_seen, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
        <SubjectSetProgressBanner
          subject={subject}
          workflow={workflow}
        />
        <img src="https://placekitten.com/800/400" alt='placeholder' />
      </Box>
    </Grommet>
  )
}

WithRetiredSubject.args = {
  already_seen: false,
  dark: false,
  retired: true
}

export function WithAlreadySeenSubject({ already_seen, dark, retired }) {
  const { subject, workflow } = buildMocks({ already_seen, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
        <SubjectSetProgressBanner
          subject={subject}
          workflow={workflow}
        />
        <img src="https://placekitten.com/800/400" alt='placeholder' />
      </Box>
    </Grommet>
  )
}

WithAlreadySeenSubject.args = {
  already_seen: true,
  dark: false,
  retired: false
}
