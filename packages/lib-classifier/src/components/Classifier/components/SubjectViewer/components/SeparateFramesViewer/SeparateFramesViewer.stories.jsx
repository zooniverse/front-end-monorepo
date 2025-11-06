import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import asyncStates from '@zooniverse/async-states'

import SeparateFramesViewer from './SeparateFramesViewer'

export default {
  title: 'Subject Viewers / SeparateFramesViewer / Layouts',
  component: SeparateFramesViewer
}

const mockSubject = SubjectFactory.build({
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/1e54b552-4608-4701-9db9-b8342b81278a.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/098f3fb6-5021-410a-82a2-477a28b2bcd6.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/8fcb18b0-de80-42cd-ba2a-4871da30c74f.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/85d8d82a-c88d-493c-b3db-7cd9f2ca5ad8.jpeg'
    }
  ]
})

const workflowWithOneColumn = WorkflowFactory.build({
  configuration: {
    invert_subject: true,
    multi_image_layout: 'col'
  }
})

const storeWithOneColumn = mockStore({
  subject: mockSubject,
  workflow: workflowWithOneColumn
})
storeWithOneColumn.subjectViewer.setSeparateFramesView(true)
storeWithOneColumn.subjectViewer.enableRotation(true)

export const OneColumn = () => {
  return (
    <Provider classifierStore={storeWithOneColumn}>
      <SeparateFramesViewer
        loadingState={asyncStates.success}
        subject={storeWithOneColumn.subjects.active}
      />
    </Provider>
  )
}

const workflowWithOneRow = WorkflowFactory.build({
  configuration: {
    invert_subject: true,
    multi_image_layout: 'row'
  }
})

const storeWithOneRow = mockStore({
  subject: mockSubject,
  workflow: workflowWithOneRow
})
storeWithOneRow.subjectViewer.setSeparateFramesView(true)
storeWithOneRow.subjectViewer.enableRotation(true)

export const OneRow = () => {
  return (
    <Provider classifierStore={storeWithOneRow}>
      <SeparateFramesViewer
        loadingState={asyncStates.success}
        subject={storeWithOneRow.subjects.active}
      />
    </Provider>
  )
}

const workflowWithTwoColGrid = WorkflowFactory.build({
  configuration: {
    invert_subject: true,
    multi_image_layout: 'grid2'
  }
})

const storeWithTwoColGrid = mockStore({
  subject: mockSubject,
  workflow: workflowWithTwoColGrid
})
storeWithTwoColGrid.subjectViewer.setSeparateFramesView(true)
storeWithTwoColGrid.subjectViewer.enableRotation(true)

export const TwoColumnGrid = () => {
  return (
    <Provider classifierStore={storeWithTwoColGrid}>
      <SeparateFramesViewer
        loadingState={asyncStates.success}
        subject={storeWithTwoColGrid.subjects.active}
      />
    </Provider>
  )
}

const workflowWithThreeColGrid = WorkflowFactory.build({
  configuration: {
    invert_subject: true,
    multi_image_layout: 'grid3'
  }
})

const storeWithThreeColGrid = mockStore({
  subject: mockSubject,
  workflow: workflowWithThreeColGrid
})
storeWithThreeColGrid.subjectViewer.setSeparateFramesView(true)
storeWithThreeColGrid.subjectViewer.enableRotation(true)

export const ThreeColumnGrid = () => {
  return (
    <Provider classifierStore={storeWithThreeColGrid}>
      <SeparateFramesViewer
        loadingState={asyncStates.success}
        subject={storeWithThreeColGrid.subjects.active}
      />
    </Provider>
  )
}
