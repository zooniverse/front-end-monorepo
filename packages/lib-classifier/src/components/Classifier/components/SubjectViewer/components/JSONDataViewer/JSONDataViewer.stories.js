import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import { Factory } from 'rosie'

import { PanZoomProvider } from '@plugins/drawingTools/shared/PanZoomContext'

import mockStore from '@test/mockStore'

import ImageToolbar from '../../../ImageToolbar'
import JSONDataViewer from './JSONDataViewer'

const superWaspSubject = Factory.build('subject', {
  locations: [
    { 'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/f311cd2a-f6c7-4cc2-a411-0e32c5ff55e3.json'}
  ]
})

const lightCurveSubject = Factory.build('subject', {
  locations: [
    { 'text/plain': 'https://panoptes-uploads.zooniverse.org/subject_location/a67ffd6c-36bc-4939-ad32-3706f606825b.txt'}
  ]
})

const variableStarSubject = Factory.build('subject', {
  locations: [
    { 'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/d6b3a990-b284-456e-ab23-1e497d660779.json'}
  ]
})
const defaultStore = mockStore({ subject: lightCurveSubject })

function ViewerContext({
  store = defaultStore,
  children
}) {
  return (
    <Provider classifierStore={store}>
      <PanZoomProvider>
        {children}
      </PanZoomProvider>
    </Provider>
  )
}

export default {
  title: 'Subject Viewers / JSONDataViewer',
  component: JSONDataViewer
}

export function DataSeries() {
  return (
    <ViewerContext store={DataSeries.store}>
      <Box direction='row' height='medium' width='large'>
        <JSONDataViewer />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}
DataSeries.store = mockStore({ subject: superWaspSubject })

export function TESSLightCurve() {
  return (
    <ViewerContext store={TESSLightCurve.store}>
      <Box direction='row' height='medium' width='large'>
        <JSONDataViewer />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}
TESSLightCurve.store = mockStore({ subject: lightCurveSubject })

export function VariableStar() {
  return (
    <ViewerContext store={VariableStar.store}>
      <Box direction='row' height='medium' width='large'>
        <JSONDataViewer />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}
VariableStar.store = mockStore({ subject: variableStarSubject })
