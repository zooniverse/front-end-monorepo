import { types } from 'mobx-state-tree'

import BarChart from './BarChart'
import DataSeriesPlot from './DataSeriesPlot'
import GeoMapV1 from './GeoMapV1'
import TESSLightCurve from './TESSLightCurve'
import VariableStarPlots from './VariableStarPlots'

export default types.union(BarChart, DataSeriesPlot, GeoMapV1, TESSLightCurve, VariableStarPlots)
