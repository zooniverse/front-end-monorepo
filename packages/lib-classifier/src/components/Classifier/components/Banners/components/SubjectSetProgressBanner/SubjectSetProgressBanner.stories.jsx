import { Box } from 'grommet'
import SubjectSetProgressBanner from './SubjectSetProgressBanner'
// import readme from '../../README.md'
import {
  SubjectFactory,
  SubjectSetFactory,
  WorkflowFactory
} from '@test/factories'
import mockStore from '@test/mockStore'

function buildMocks({
  already_seen,
  metadata = { ['#priority']: 37 },
  retired
}) {
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
  const store = mockStore({
    subject: subjectSnapshot,
    subjectSet: subjectSetSnapshot,
    workflow: workflowSnapshot
  })

  const subject = store.subjects.active
  const workflow = store.workflows.resources.get(workflowSnapshot.id)
  return { subject, workflow }
}

export default {
  title: 'Banners / Subject Set Progress Banner',
  component: SubjectSetProgressBanner
  // parameters: {
  //   docs: {
  //     description: {
  //       component: readme
  //     }
  //   }
  // }
}

export function Default({ already_seen, retired }) {
  const { subject, workflow } = buildMocks({ already_seen, retired })
  return (
    <Box width='large'>
      <SubjectSetProgressBanner subject={subject} workflow={workflow} />
      <img src='https://static.zooniverse.org/fem-assets/subject-placeholder.jpg' alt='placeholder' />
    </Box>
  )
}

Default.args = {
  already_seen: false,
  retired: false
}

export function WithVisiblePriorityMetadata({ already_seen, retired }) {
  const metadata = { priority: 37 }
  const { subject, workflow } = buildMocks({ already_seen, metadata, retired })
  return (
    <Box width='large'>
      <SubjectSetProgressBanner subject={subject} workflow={workflow} />
      <img src='https://static.zooniverse.org/fem-assets/subject-placeholder.jpg' alt='placeholder' />
    </Box>
  )
}

export function WithVisiblePriorityMetadataAndRetired({
  already_seen,
  retired
}) {
  const metadata = { priority: 37 }
  const { subject, workflow } = buildMocks({ already_seen, metadata, retired })
  return (
    <Box width='large'>
      <SubjectSetProgressBanner subject={subject} workflow={workflow} />
      <img src='https://static.zooniverse.org/fem-assets/subject-placeholder.jpg' alt='placeholder' />
    </Box>
  )
}

WithVisiblePriorityMetadataAndRetired.args = {
  already_seen: false,
  retired: true
}

export function WithVisiblePriorityMetadataAndAlreadySeen({
  already_seen,
  retired
}) {
  const metadata = { priority: 37 }
  const { subject, workflow } = buildMocks({ already_seen, metadata, retired })
  return (
    <Box width='large'>
      <SubjectSetProgressBanner subject={subject} workflow={workflow} />
      <img src='https://static.zooniverse.org/fem-assets/subject-placeholder.jpg' alt='placeholder' />
    </Box>
  )
}

WithVisiblePriorityMetadataAndAlreadySeen.args = {
  already_seen: true,
  retired: false
}

export function WithRetiredSubject({ already_seen, retired }) {
  const { subject, workflow } = buildMocks({ already_seen, retired })
  return (
    <Box width='large'>
      <SubjectSetProgressBanner subject={subject} workflow={workflow} />
      <img src='https://static.zooniverse.org/fem-assets/subject-placeholder.jpg' alt='placeholder' />
    </Box>
  )
}

WithRetiredSubject.args = {
  already_seen: false,
  retired: true
}

export function WithAlreadySeenSubject({ already_seen, retired }) {
  const { subject, workflow } = buildMocks({ already_seen, retired })
  return (
    <Box width='large'>
      <SubjectSetProgressBanner subject={subject} workflow={workflow} />
      <img src='https://static.zooniverse.org/fem-assets/subject-placeholder.jpg' alt='placeholder' />
    </Box>
  )
}

WithAlreadySeenSubject.args = {
  already_seen: true,
  retired: false
}

export function WithArrows({ already_seen, retired }) {
  const { subject, workflow } = buildMocks({ already_seen, retired })
  return (
    <Box width='large'>
      <SubjectSetProgressBanner
        onNext={() => {}}
        onPrevious={() => {}}
        subject={subject}
        workflow={workflow}
      />
      <img src='https://static.zooniverse.org/fem-assets/subject-placeholder.jpg' alt='placeholder' />
    </Box>
  )
}

WithArrows.args = {
  already_seen: false,
  retired: false
}
