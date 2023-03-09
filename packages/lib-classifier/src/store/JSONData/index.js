import { types } from 'mobx-state-tree'

import BarChart from './BarChart'
import DataSeriesPlot from './DataSeriesPlot'
import TESSLightCurve from './TESSLightCurve'

export default types.union(BarChart, DataSeriesPlot, TESSLightCurve)
