import { types } from 'mobx-state-tree'

import TESSLightCurve from './TESSLightCurve'

const CSSBox = types.model('CSSBox', {
  bottom: types.number,
  left: types.number,
  right: types.number,
  top: types.number
})

const InvertAxes = types.model('InvertAxes', {
  x: types.optional(types.boolean, false),
  y: types.optional(types.boolean, false)
})

const ZoomConfiguration = types.model('ZoomConfiguration', {
  direction: types.optional(types.enumeration(['both', 'x', 'y']), 'both'),
  minZoom: types.optional(types.number, 1),
  maxZoom: types.optional(types.number, 10),
  zoomInValue: types.optional(types.number, 1.2),
  zoomOutValue: types.optional(types.number, 0.8)
})

const ChartOptions = types.model('ChartOptions', {
  color: types.maybe(types.string),
  xAxisLabel: types.string,
  xAxisLabelOffset: types.maybe(types.number),
  yAxisLabel: types.string,
  yAxisLabelOffset: types.maybe(types.number),
  invertAxes: types.maybe(InvertAxes),
  margin: types.maybe(CSSBox),
  padding: types.maybe(CSSBox),
  zoomConfiguration: types.maybe(ZoomConfiguration)
})

const DataPoint = types.model('DataPoint', {
  x: types.number,
  y: types.number,
  x_error: types.maybe(types.number),
  y_error: types.maybe(types.number)
})

const SeriesOptions = types.model('SeriesOptions', {
  glyph: types.maybe(types.enumeration(['circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye'])),
  label: types.string,
  color: types.maybe(types.string),
  period: types.maybe(types.number)
})

const DataSeries = types.model('DataSeries', {
  seriesData: types.array(DataPoint),
  seriesOptions: types.maybe(SeriesOptions)
})

const ChartData = types.refinement('ChartData', types.array(DataSeries), value => value.length > 0)

export default types.model('DataSeriesPlot', {
  data: types.union(ChartData, TESSLightCurve),
  chartOptions: types.maybe(ChartOptions)
})
