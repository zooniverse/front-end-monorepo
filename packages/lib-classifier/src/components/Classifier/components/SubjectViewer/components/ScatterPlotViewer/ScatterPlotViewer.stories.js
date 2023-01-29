import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { darken } from 'polished'
import ScatterPlotViewer from './ScatterPlotViewer'
import ScatterPlotViewerConnector from './ScatterPlotViewerConnector'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import ImageToolbar from '../../../ImageToolbar'
import {
  keplerMockDataWithOptions,
  randomSingleSeriesData
} from './helpers/mockData'
import { Factory } from 'rosie'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const { data } = randomSingleSeriesData

const config = {
  notes: {
    markdown: readme
  }
}

let zoomCallback

function onZoom (type) {
  zoomCallback(type)
}

function setZoomCallback (callback) {
  zoomCallback = callback
}

const { colors } = zooTheme.global

const keplerSubject = Factory.build('subject', {
  locations: [
    { 'application/json': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/mockLightCurves/kepler.json' }
  ]
})

const transientObjectSubject = Factory.build('subject', {
  locations: [
    {
      'application/json': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/978b660f4ef660d5355148c3c22ef0912b96c7c1/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/mockLightCurves/transients/subject-1/zoo_subject_ZTF20abqdkne.json'
    }
  ]
})

const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  fieldGuide: {
    setActiveItemIndex: () => {},
    setModalVisibility:  ()  => {}
  },
  subjects: {
    active: transientObjectSubject
  },
  subjectViewer: SubjectViewerStore.create({}),
  workflows: {
    active: {}
  },
  workflowSteps: {
    activeStepTasks: []
  }
}


function ViewerContext(props) {
  const { children, theme } = props
  return (
    <Provider classifierStore={mockStore}>
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={theme}
        themeMode='light'
      >
        {children}
      </Grommet>
    </Provider>
  )
}

export default {
  title: 'Subject Viewers / ScatterPlotViewer',
  component: ScatterPlotViewer,
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function LightTheme() {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Box height='medium' width='large'>
        <ScatterPlotViewer
          data={data}
          xAxisLabel='x-axis'
          yAxisLabel='y-axis'
        />
      </Box>
    </Grommet>
  )
}

LightTheme.story = {
  name: 'light theme',
  parameters: config
}

export function DarkTheme() {
  const darkZooTheme = { ...zooTheme, dark: true }

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={darkZooTheme}
      themeMode='dark'
    >
      <Box height='medium' width='large'>
        <ScatterPlotViewer
          data={data}
          xAxisLabel='x-axis'
          yAxisLabel='y-axis'
        />
      </Box>
    </Grommet>
  )
}

DarkTheme.story = {
  name: 'dark theme',
  parameters: {
    backgrounds: backgrounds.darkDefault,
    viewport: {
      defaultViewport: 'responsive'
    },
    ...config
  }
}

export function NarrowView() {
  const darkZooTheme = { ...zooTheme, dark: true }
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Box height='medium' width='large'>
        <ScatterPlotViewer
          data={data}
          xAxisLabel='x-axis'
          yAxisLabel='y-axis'
        />
      </Box>
    </Grommet>
  )
}

NarrowView.story = {
  name: 'narrow view',
  parameters: {
    viewport: {
      defaultViewport: 'iphone5'
    },
    ...config
  }
}

export function ErrorBars() {
  function constructData () {
    return [...Array(60)].map((number, index) => {
      const coords = {
        x: Math.floor(Math.random() * 10) + 1,
        y: Math.floor(Math.random() * 10) + 1,
      }

      if (index % 2 == 0) coords.x_error = Math.random()
      if (index % 5 == 0) coords.y_error = Math.random()
      return coords
    })
  }

  const data = [{
    seriesData: constructData(),
    seriesOptions: {
      label: 'data'
    }
  }]

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Box direction='row' height='medium' width='large'>
        <ScatterPlotViewer
          data={data}
          panning
          setOnZoom={setZoomCallback}
          xAxisLabel='x-axis'
          yAxisLabel='y-axis'
          zooming
          zoomConfiguration={{
            direction: 'both',
            minZoom: 1,
            maxZoom: 10,
            zoomInValue: 1.2,
            zoomOutValue: 0.8
          }}
        />
      </Box>
    </Grommet>
  )
}

ErrorBars.story = {
  name: 'data with error bars'
}

export function KeplerLightCurve() {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Box height='medium' width='large'>
        <ScatterPlotViewer
          axisColor={colors['light-1']}
          backgroundColor={darken(0.08, colors['neutral-1'])}
          data={keplerMockDataWithOptions.data}
          glyphColors={[colors['light-1']]}
          margin={keplerMockDataWithOptions.chartOptions.margin}
          padding={keplerMockDataWithOptions.chartOptions.padding}
          tickDirection='inner'
          xAxisLabel={keplerMockDataWithOptions.chartOptions.xAxisLabel}
          yAxisLabel={keplerMockDataWithOptions.chartOptions.yAxisLabel}
          zoomConfiguration={{
            direction: 'both',
            minZoom: 1,
            maxZoom: 10,
            zoomInValue: 1.2,
            zoomOutValue: 0.8
          }}
        />
      </Box>
    </Grommet>
  )
}

KeplerLightCurve.story = {
  name: 'kepler light curve data with inner facing axes',
  parameters: config
}

export function PanAndZoom() {
  return (
    <ViewerContext theme={zooTheme}>
      <Box direction='row' height='medium' width='large'>
        <ScatterPlotViewerConnector
          zoomConfiguration={{
            direction: 'both',
            minZoom: 1,
            maxZoom: 10,
            zoomInValue: 1.2,
            zoomOutValue: 0.8
          }}
        />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}

PanAndZoom.story = {
  name: 'pan and zoom',
  parameters: config
}

export function MultipleSeries() {
  return (
    <ViewerContext theme={zooTheme}>
      <Box direction='row' height='medium' width='large'>
        <ScatterPlotViewerConnector />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}

MultipleSeries.story = {
  name: 'multiple series data (transient object)',
  parameters: config
}
