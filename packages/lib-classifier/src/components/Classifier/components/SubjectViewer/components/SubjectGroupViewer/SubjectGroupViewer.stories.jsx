import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import { Factory } from 'rosie'

import { useKeyZoom } from '@hooks'
import mockStore from '@test/mockStore'
import SubjectGroupViewer from './SubjectGroupViewerContainer'
import {
  AnnotateButton,
  MoveButton,
  ResetButton,
  RotateButton,
  ZoomInButton,
  ZoomOutButton
} from '../../../ImageToolbar/components'
import readme from './README.md'

const subject = Factory.build('subject', {
  locations: [
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' }
  ]
})

const workflow = Factory.build('workflow', {
  configuration: {
    subject_viewer: 'subjectGroup',
    cell_width: 300,
    cell_height: 200,
    cell_style: {
      stroke: '#fff',
      strokeWidth: '4',
      fill: '#000'
    },
    grid_columns: 3,
    grid_rows: 2
  }
})

const store = mockStore({ subject, workflow })

function ViewerContext({ children }) {
  return (
    <Provider classifierStore={store}>
      {children}
    </Provider>
  )
}

export default {
  title: 'Subject Viewers / SubjectGroupViewer',
  component: SubjectGroupViewer,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = () => {
  return (
    <ViewerContext>
      <Box height='medium' width='large'>
        <SubjectGroupViewer subject={store.subjects.active} />
      </Box>
    </ViewerContext>
  )
}

function Toolbar({ children, ...props }) {
  const { onKeyZoom } = useKeyZoom()
  return (
    <Box onKeyDown={onKeyZoom} {...props}>
      {children}
    </Box>
  )
}

export const WithZoomControls = () => {
  return (
    <ViewerContext>
      <Toolbar direction='row' height='4rem'>
        <AnnotateButton />
        <MoveButton />
        <ZoomInButton />
        <ZoomOutButton />
        <RotateButton />
        <ResetButton />
      </Toolbar>
      <Box height='medium' width='large'>
        <SubjectGroupViewer subject={store.subjects.active} />
      </Box>
    </ViewerContext>
  )
}
