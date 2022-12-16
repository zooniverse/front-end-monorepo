import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import {
  DrawingTaskFactory,
  SubjectFactory,
  UPPFactory,
  WorkflowFactory
} from '@test/factories'
import mockStore from '@test/mockStore'

import MetaTools from './MetaTools'

export default {
  title: 'Meta Tools / MetaToolsContainer',
  component: MetaTools,
  args: {
    dark: false
  }
}

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

const mockSubject = SubjectFactory.build({
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/1e54b552-4608-4701-9db9-b8342b81278a.jpeg'
    }
  ],
  metadata: {
    time: 'Morning',
    location: 'United States'
  }
})

const mockWorkflow = WorkflowFactory.build({
  tasks: {
    T0: DrawingTaskFactory.build()
  }
})

const upp = UPPFactory.build()

const store = mockStore({
  subject: mockSubject,
  workflow: mockWorkflow
})

store.userProjectPreferences.setUPP(upp)

export const Default = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={store}>
        <MetaTools />
      </Provider>
    </Grommet>
  )
}

const smallViewerStore = mockStore({
  subject: mockSubject,
  subjectViewer: { viewerWidth: 'small' },
  workflow: mockWorkflow
})

smallViewerStore.userProjectPreferences.setUPP(upp)

export const SmallSubjectViewer = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={smallViewerStore}>
        <MetaTools />
      </Provider>
    </Grommet>
  )
}
