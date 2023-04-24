import sinon from 'sinon'
import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import SubjectGroupViewer from './SubjectGroupViewerContainer'
import {
  AnnotateButton,
  MoveButton,
  ResetButton,
  RotateButton,
  ZoomInButton,
  ZoomOutButton
} from '../../../ImageToolbar/components/'
import withKeyZoom from '../../../withKeyZoom'
import readme from './README.md'

const subject = {
  locations: [
    { 'image/jpeg': 'http://placekitten.com/600/400' },
    { 'image/jpeg': 'http://placekitten.com/600/400' },
    { 'image/jpeg': 'http://placekitten.com/600/400' },
    { 'image/jpeg': 'http://placekitten.com/600/400' },
    { 'image/jpeg': 'http://placekitten.com/600/400' },
    { 'image/jpeg': 'http://placekitten.com/600/400' }
  ]
}

const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  drawing: {
    addToStream: sinon.stub()
  },
  subjectViewer: SubjectViewerStore.create({}),
  workflows: {
    active: {
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
    }
  },
  workflowSteps: {
    activeStepTasks: []
  }
}

function ViewerContext({ children }) {
  return (
    <Provider classifierStore={mockStore}>
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
        <SubjectGroupViewer subject={subject} />
      </Box>
    </ViewerContext>
  )
}

export const WithZoomControls = () => {
  const Toolbar = withKeyZoom(Box)
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
        <SubjectGroupViewer subject={subject} />
      </Box>
    </ViewerContext>
  )
}
