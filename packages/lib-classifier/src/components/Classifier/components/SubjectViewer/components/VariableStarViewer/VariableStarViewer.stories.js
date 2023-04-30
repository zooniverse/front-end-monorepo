import { Box } from 'grommet'
import { Factory } from 'rosie'
import VariableStarViewer from './VariableStarViewerContainer'
import VariableStarViewerConnector from './VariableStarViewerConnector'
import { Provider } from 'mobx-react'

import SubjectViewerStore from '@store/SubjectViewerStore'
import mockStore from '@test/mockStore'
import ImageToolbar from '../../../ImageToolbar'
import readme from './README.md'
import asyncStates from '@zooniverse/async-states'

const subject = Factory.build('subject', {
  locations: [
    {
      'image/png': 'talkfallback.png'
    },
    {
      'application/json': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/mockLightCurves/variableStar.json'
    },
    { 'image/png': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/components/VariableStarViewer/mocks/temperature.png' }
  ]
})

const store = mockStore({ subject })

function ViewerContext ({ children }) {
  return (
    <Provider classifierStore={store}>
      {children}
    </Provider>
  )
}

export default {
  title: 'Subject Viewers / VariableStarViewer',
  component: VariableStarViewer,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function Default() {
  return (
    <ViewerContext>
      <Box height='640px' width={{ max: '900px' }}>
        <VariableStarViewer
          loadingState={asyncStates.success}
          subject={store.subjects.active}
        />
      </Box>
    </ViewerContext>
  )
}

export function NarrowView() {
  return (
    <ViewerContext>
      <Box height='640px' width={{ max: '900px' }}>
        <VariableStarViewer
          loadingState={asyncStates.success}
          subject={store.subjects.active}
        />
      </Box>
    </ViewerContext>
  )
}

NarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
  }
}

export function PanZoom() {
  return (
    <ViewerContext>
      <Box direction='row' height='640px' width={{ max: '900px' }}>
        <VariableStarViewerConnector
          loadingState={asyncStates.success}
        />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}
