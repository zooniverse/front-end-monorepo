import zooTheme from '@zooniverse/grommet-theme'
import { Box } from 'grommet'
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

const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  fieldGuide: {
    setActiveItemIndex: () => {},
    setModalVisibility: () => {}
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
  const { children } = props
  return <Provider classifierStore={mockStore}>{children}</Provider>
}

export default {
  title: 'Subject Viewers / ScatterPlotViewer',
  component: ScatterPlotViewer,
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
    <Box height='medium' width='large'>
      <ScatterPlotViewer data={data} xAxisLabel='x-axis' yAxisLabel='y-axis' />
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

export function ErrorBars() {
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
  )
}

export function KeplerLightCurve() {
  return (
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
  )
}

export function PanAndZoom() {
  return (
    <ViewerContext>
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

export function MultipleSeries() {
  return (
    <ViewerContext>
      <Box direction='row' height='medium' width='large'>
        <ScatterPlotViewerConnector />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}
