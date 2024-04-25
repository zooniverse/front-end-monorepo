import { types } from 'mobx-state-tree'

import BarChart from './BarChart'
import DataSeriesPlot from './DataSeriesPlot'

export default types.model('VariableStarPlots', {
  data: types.model('VariableStarPlots', {
    scatterPlot: DataSeriesPlot,
    barCharts: types.map(BarChart)
  })
})
