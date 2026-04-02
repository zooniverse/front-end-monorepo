import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import asyncStates from '@zooniverse/async-states'

import SeparateFramesViewer from './SeparateFramesViewer'

export default {
  title: 'Subject Viewers / SeparateFramesViewer / Layouts',
  component: SeparateFramesViewer
}

const mockSubjectImagesOnly = SubjectFactory.build({
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

const mockSubjectImagesAndVideos = SubjectFactory.build({
  locations: [
    {
      'video/mp4':
        'https://panoptes-uploads.zooniverse.org/subject_location/49fa80c5-bb6a-4d03-8ebe-fb2ac585ed8c.mp4'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/0ff3f805-e224-4a98-8781-25e1fc536967.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/f62b8d72-c9ab-4ed9-ba4c-1b663ba81703.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/6421dcb5-97cb-4bf2-9161-363ac81c0116.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/e6570f19-7bd9-4cd3-b821-54fe31689b1e.jpeg'
    }
  ]
})

const workflowWithOneColumn = WorkflowFactory.build({
  configuration: {
    invert_subject: true,
    multi_image_layout: 'col'
  }
})

const storeWithOneColumnImagesOnly = mockStore({
  subject: mockSubjectImagesOnly,
  workflow: workflowWithOneColumn
})
storeWithOneColumnImagesOnly.subjectViewer.setSeparateFramesView(true)
storeWithOneColumnImagesOnly.subjectViewer.enableRotation(true)

export const OneColumnImagesOnly = () => {
  return (
    <Provider classifierStore={storeWithOneColumnImagesOnly}>
      <SeparateFramesViewer
        loadingState={asyncStates.success}
        subject={storeWithOneColumnImagesOnly.subjects.active}
      />
    </Provider>
  )
}

const storeWithOneColumnImagesAndVideos = mockStore({
  subject: mockSubjectImagesAndVideos,
  workflow: workflowWithOneColumn
})
storeWithOneColumnImagesAndVideos.subjectViewer.setSeparateFramesView(true)
storeWithOneColumnImagesAndVideos.subjectViewer.enableRotation(true)

export const OneColumnImagesAndVideos = () => {
  return (
    <Provider classifierStore={storeWithOneColumnImagesAndVideos}>
      <SeparateFramesViewer
        loadingState={asyncStates.success}
        subject={storeWithOneColumnImagesAndVideos.subjects.active}
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
  subject: mockSubjectImagesOnly,
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
  subject: mockSubjectImagesOnly,
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
  subject: mockSubjectImagesOnly,
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
