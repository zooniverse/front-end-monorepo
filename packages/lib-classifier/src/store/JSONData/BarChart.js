import { types } from 'mobx-state-tree'

const CSSBox = types.model('CSSBox', {
  bottom: types.number,
  left: types.number,
  right: types.number,
  top: types.number
})

const ChartOptions = types.model('ChartOptions', {
  xAxisLabel: types.string,
  xAxisLabelOffset: types.optional(types.number, 0),
  yAxisLabel: types.string,
  yAxisLabelOffset: types.optional(types.number, 0),
  margin: types.maybe(CSSBox),
  padding: types.maybe(CSSBox)
})

const BarData = types.model('BarData', {
  color: types.maybe(types.string),
  label: types.string,
  value: types.number
})

const BarChart = types.model('BarChart', {
  data: types.array(BarData),
  chartOptions: types.maybe(ChartOptions)
})

export default types.frozen(BarChart)
