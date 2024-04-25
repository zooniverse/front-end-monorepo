import { types } from 'mobx-state-tree'

import BarChart from './BarChart'
import DataSeriesPlot from './DataSeriesPlot'
import TESSLightCurve from './TESSLightCurve'
import VariableStarPlots from './VariableStarPlots'

export default types.union(BarChart, DataSeriesPlot, TESSLightCurve, VariableStarPlots)
