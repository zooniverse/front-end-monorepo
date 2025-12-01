import { Box } from 'grommet'
import { Factory } from 'rosie'
import VariableStarViewer from '.'
import JSONDataViewer from '../JSONDataViewer'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'
import ImageToolbar from '../../../ImageToolbar'
import readme from './README.md'

const subject = Factory.build('subject', {
  locations: [
    {
      'image/png': 'talkfallback.png'
    },
    {
      'application/json': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/main/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/mockLightCurves/variableStar.json'
    },
    { 'image/png': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/main/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/components/VariableStarViewer/mocks/temperature.png' }
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
        <JSONDataViewer />
      </Box>
    </ViewerContext>
  )
}

export function NarrowView() {
  return (
    <ViewerContext>
      <Box height='640px' width={{ max: '900px' }}>
        <JSONDataViewer />
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
        <JSONDataViewer />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}
