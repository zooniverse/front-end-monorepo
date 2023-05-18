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

const BarValues = types.model('BarValues', {
  color: types.maybe(types.string),
  label: types.string,
  value: types.number
})

const BarData = types.refinement('BarData', types.array(BarValues), value => value.length > 0)

export default types.model('BarChart', {
  data: BarData,
  chartOptions: types.maybe(ChartOptions)
})
