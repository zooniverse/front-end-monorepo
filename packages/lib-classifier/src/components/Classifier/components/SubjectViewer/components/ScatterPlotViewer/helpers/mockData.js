import zooTheme from '@zooniverse/grommet-theme'
import { genRandomNormalPoints } from '@vx/mock-data'
import { scaleLinear } from '@vx/scale'
import { zip } from 'lodash'
import * as d3 from 'd3'
import kepler from '../../../helpers/mockLightCurves/kepler'
import variableStar from '../../../helpers/mockLightCurves/variableStar'
import { left, top, xMin, xMax, yMin, yMax } from './utils'

const color = zooTheme.global.colors['light-1']
const fontFamily = zooTheme.global.font.family
const fontSize = 12
const parentWidth = 768
const parentHeight = 384

const randomPoints = genRandomNormalPoints()

const xPoints = randomPoints.map((point) => {
  return point[0]
})
const yPoints = randomPoints.map((point) => {
  return point[1]
})

const data = {
  x: xPoints,
  y: yPoints
}

const dataSeriesWithXErrors = [...Array(10)].map(() => {
  const coords = {
    x: Math.floor(Math.random() * 10) + 1,
    y: Math.floor(Math.random() * 10) + 1,
    x_error: Math.random()
  }

  return coords
})

const dataSeriesWithYErrors = [...Array(10)].map(() => {
  const coords = {
    x: Math.floor(Math.random() * 10) + 1,
    y: Math.floor(Math.random() * 10) + 1,
    y_error: Math.random()
  }

  return coords
})

const dataPoints = zip(data.x, data.y)

const dataExtent = {
  x: d3.extent(xPoints),
  y: d3.extent(yPoints)
}

const transformMatrix = {
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  translateX: 0,
  translateY: 0
}

const tickDirection = 'outer'
const margin = {
  bottom: 60,
  left: 60,
  right: 10,
  top: 10
}

const padding = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0
}
const xRangeMin = xMin({ tickDirection, padding })
const xRangeMax = xMax({ tickDirection, parentWidth, margin })

const yRangeMin = yMin({ tickDirection, padding })
const yRangeMax = yMax({ tickDirection, parentHeight, margin, padding })

const xScale = scaleLinear({
  domain: dataExtent.x,
  range: [xRangeMin, xRangeMax]
})

const yScale = scaleLinear({
  domain: dataExtent.y,
  range: [yRangeMax, yRangeMin]
})

const bottomAxis = {
  label: 'Days',
  orientation: 'bottom',
  scale: xScale
}

const leftAxis = {
  label: 'Brightness',
  orientation: 'left',
  scale: yScale
}

const axesConfig = {
  xAxis: bottomAxis,
  yAxis: leftAxis
}

const keplerMockDataWithOptions = {
  data: kepler,
  chartOptions: {
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
    xAxisLabel: 'Days',
    yAxisLabel: 'Brightness'
  }
}

const lightCurveMockData = {
  kepler,
  variableStar: variableStar.data
}

const randomSingleSeriesData = {
  data,
  dataPoints,
  dataExtent
}

export {
  axesConfig,
  bottomAxis,
  color,
  dataSeriesWithXErrors,
  dataSeriesWithYErrors,
  fontFamily,
  fontSize,
  keplerMockDataWithOptions,
  leftAxis,
  lightCurveMockData,
  margin,
  padding,
  parentWidth,
  parentHeight,
  randomSingleSeriesData,
  transformMatrix,
  xScale,
  yScale,
  xRangeMin,
  xRangeMax,
  yRangeMin,
  yRangeMax
}
