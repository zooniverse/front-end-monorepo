import React from 'react'
import { Provider } from 'mobx-react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import Banners from '../../Banners'
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

  return store
}

export default {
  title: 'Banners / Subject Set Progress Banner',
  component: Banners,
  // parameters: {
  //   docs: {
  //     description: {
  //       component: readme
  //     }
  //   }
  // }
}

export function Default({ already_seen, dark, retired }) {
  const store = buildMocks({ already_seen, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Provider classifierStore={store}>
        <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
          <Banners />
          <img src="https://placekitten.com/800/400" alt='placeholder' />
        </Box>
      </Provider>
    </Grommet>
  )
}

Default.args = {
  already_seen: false,
  dark: false,
  retired: false
}

export function WithVisiblePriorityMetadata({ already_seen, dark, retired }) {
  const priority = { priority: 37 }
  const store = buildMocks({ already_seen, priority, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Provider classifierStore={store}>
        <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
          <Banners />
          <img src="https://placekitten.com/800/400" alt='placeholder' />
        </Box>
      </Provider>
    </Grommet>
  )
}

export function WithVisiblePriorityMetadataAndRetired({ already_seen, dark, retired }) {
  const priority = { priority: 37 }
  const store = buildMocks({ already_seen, priority, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Provider classifierStore={store}>
        <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
          <Banners />
          <img src="https://placekitten.com/800/400" alt='placeholder' />
        </Box>
      </Provider>
    </Grommet>
  )
}

WithVisiblePriorityMetadataAndRetired.args = {
  already_seen: false,
  dark: false,
  retired: true
}

export function WithVisiblePriorityMetadataAndAlreadySeen({ already_seen, dark, retired }) {
  const priority = { priority: 37 }
  const store = buildMocks({ already_seen, priority, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Provider classifierStore={store}>
        <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
          <Banners />
          <img src="https://placekitten.com/800/400" alt='placeholder' />
        </Box>
      </Provider>
    </Grommet>
  )
}

WithVisiblePriorityMetadataAndAlreadySeen.args = {
  already_seen: true,
  dark: false,
  retired: false
}

export function WithRetiredSubject({ already_seen, dark, retired }) {
  const store = buildMocks({ already_seen, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Provider classifierStore={store}>
        <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
          <Banners />
          <img src="https://placekitten.com/800/400" alt='placeholder' />
        </Box>
      </Provider>
    </Grommet>
  )
}

WithRetiredSubject.args = {
  already_seen: false,
  dark: false,
  retired: true
}

export function WithAlreadySeenSubject({ already_seen, dark, retired }) {
  const store = buildMocks({ already_seen, retired })
  return (
    <Grommet
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Provider classifierStore={store}>
        <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
          <Banners />
          <img src="https://placekitten.com/800/400" alt='placeholder' />
        </Box>
      </Provider>
    </Grommet>
  )
}

WithAlreadySeenSubject.args = {
  already_seen: true,
  dark: false,
  retired: false
}
