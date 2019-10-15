import zooTheme from '@zooniverse/grommet-theme'
import { genRandomNormalPoints } from '@vx/mock-data'
import { scaleLinear } from '@vx/scale'
import { zip } from 'lodash'
import * as d3 from 'd3'
import { MARGIN, PADDING } from './constants'

const color = zooTheme.global.colors['light-1']
const fontFamily = zooTheme.global.font.family
const fontSize = zooTheme.text.xsmall.size
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

const xScale = scaleLinear({
  domain: dataExtent.x,
  range: [0 + PADDING, parentWidth - MARGIN]
})

const yScale = scaleLinear({
  domain: dataExtent.y,
  range: [parentHeight - PADDING, 0 + MARGIN]
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

export {
  axesConfig,
  bottomAxis,
  color,
  fontFamily,
  fontSize,
  data,
  dataExtent,
  dataPoints,
  leftAxis,
  parentWidth,
  parentHeight,
  transformMatrix,
  xScale,
  yScale
}