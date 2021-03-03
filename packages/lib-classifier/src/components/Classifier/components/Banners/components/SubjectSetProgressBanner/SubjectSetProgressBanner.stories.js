import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import SubjectSetProgressBanner from './'
import readme from '../../README.md'
import { SubjectFactory, SubjectSetFactory, WorkflowFactory } from '@test/factories'
import { createStore } from '@store/helpers'

function buildMocks({ already_seen, retired }) {
  const subjectSnapshot = SubjectFactory.build({
    already_seen,
    metadata: {
      ['#priority']: 37
    },
    retired
  })
  const subjectSetSnapshot = SubjectSetFactory.build()
  const workflowSnapshot = WorkflowFactory.build({
    grouped: true,
    subjectSet: subjectSetSnapshot.id
  })
  const store = createStore({
    subjects: {
      active: subjectSnapshot.id,
      resources: {
        [subjectSnapshot.id]: subjectSnapshot
      }
    },
    subjectSets: {
      resources: {
        [subjectSetSnapshot.id]: subjectSetSnapshot
      }
    },
    workflows: {
      resources: {
        [workflowSnapshot.id]: workflowSnapshot
      }
    }
  })
  const subject = store.subjects.active
  const workflow = store.workflows.resources.get(workflowSnapshot.id)
  return { subject, workflow }
}

export default {
  title: 'Banners / Subject Set Progress Banner',
  component: SubjectSetProgressBanner,
  args: {
    already_seen: false,
    dark: false,
    retired: false
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
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

