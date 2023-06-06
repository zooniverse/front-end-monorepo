import zooTheme from '@zooniverse/grommet-theme'
import { Box } from 'grommet'
import { darken } from 'polished'
import ScatterPlotViewer from './'
import JSONDataViewer from '../JSONDataViewer'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'
import ImageToolbar from '../../../ImageToolbar'
import {
  keplerMockDataWithOptions,
  randomSingleSeriesData
} from './helpers/mockData'
import { Factory } from 'rosie'
// import readme from './README.md'

const { data } = randomSingleSeriesData

let zoomCallback

function onZoom(type) {
  zoomCallback(type)
}

function setZoomCallback(callback) {
  zoomCallback = callback
}

const { colors } = zooTheme.global

const transientObjectSubject = Factory.build('subject', {
  locations: [
    {
      'application/json':
        'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/978b660f4ef660d5355148c3c22ef0912b96c7c1/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/mockLightCurves/transients/subject-1/zoo_subject_ZTF20abqdkne.json'
    }
  ]
})

const storeWithTransientSubject = mockStore({ subject: transientObjectSubject })

const superWaspSubject = Factory.build('subject', {
  locations: [
    { 'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/f311cd2a-f6c7-4cc2-a411-0e32c5ff55e3.json'}
  ]
})


function ViewerContext({
  store = storeWithTransientSubject,
  children
}) {
  return <Provider classifierStore={store}>{children}</Provider>
}

export default {
  title: 'Subject Viewers / ScatterPlotViewer',
  component: ScatterPlotViewer
}

export function Default(props) {
  return (
    <Box height='medium' width='large'>
      <ScatterPlotViewer {...props} data={data} xAxisLabel='x-axis' yAxisLabel='y-axis' />
    </Box>
  )
}

export function NarrowView() {
  return (
    <Box height='medium' width='large'>
      <ScatterPlotViewer data={data} xAxisLabel='x-axis' yAxisLabel='y-axis' />
    </Box>
  )
}

NarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
  }
}

export function ErrorBars(props) {
  function constructData() {
    return [...Array(60)].map((number, index) => {
      const coords = {
        x: Math.floor(Math.random() * 10) + 1,
        y: Math.floor(Math.random() * 10) + 1
      }

      if (index % 2 == 0) coords.x_error = Math.random()
      if (index % 5 == 0) coords.y_error = Math.random()
      return coords
    })
  }

  const data = [
    {
      seriesData: constructData(),
      seriesOptions: {
        label: 'data'
      }
    }
  ]

  return (
    <ViewerContext>
      <Box direction='row' height='medium' width='large'>
        <ScatterPlotViewer
          {...props}
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
    </ViewerContext>
  )
}

export function KeplerLightCurve(props) {
  const tessChartOptions = {
    axisColor: colors['light-1'],
    backgroundColor: darken(0.08, colors['neutral-1']),
    color: colors['light-1'],
    margin: {
      bottom: 10,
      left: 10,
      right: 10,
      top: 10
    },
    padding: {
      bottom: 30,
      left: 30,
      right: 0,
      top: 0
    },
    tickDirection: 'inner',
    xAxisLabel: 'Days',
    yAxisLabel: 'Brightness',
    zoomConfiguration: {
      direction: 'x',
      minZoom: 1,
      maxZoom: 10,
      zoomInValue: 1.2,
      zoomOutValue: 0.8
    }
  }
  return (
    <Box height='medium' width='large'>
      <ScatterPlotViewer
        {...props}
        data={keplerMockDataWithOptions.data}
        {...tessChartOptions}
        margin={keplerMockDataWithOptions.chartOptions.margin}
        padding={keplerMockDataWithOptions.chartOptions.padding}
        xAxisLabel={keplerMockDataWithOptions.chartOptions.xAxisLabel}
        yAxisLabel={keplerMockDataWithOptions.chartOptions.yAxisLabel}
      />
    </Box>
  )
}

export function PanAndZoom() {
  return (
    <ViewerContext>
      <Box direction='row' height='medium' width='large'>
        <JSONDataViewer
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

export function MultipleSeries() {
  return (
    <ViewerContext>
      <Box direction='row' height='medium' width='large'>
        <JSONDataViewer />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}

export function XRangeSelection() {
  return (
    <ViewerContext store={XRangeSelection.store}>
      <Box direction='row' height='medium' width='large'>
        <JSONDataViewer
          experimentalSelectionTool
          zoomConfiguration={{
            direction: 'x',
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
XRangeSelection.store = mockStore({ subject: superWaspSubject })

export function SelectedXRanges() {
  const initialSelections = [
    { x0: 95, x1: 101 },
    { x0: 114, x1: 118 }
  ]
  return (
    <ViewerContext store={SelectedXRanges.store}>
      <Box direction='row' height='medium' width='large'>
        <JSONDataViewer
          disabled
          experimentalSelectionTool
          initialSelections={initialSelections}
          zoomConfiguration={{
            direction: 'x',
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
SelectedXRanges.store = mockStore({ subject: superWaspSubject })
