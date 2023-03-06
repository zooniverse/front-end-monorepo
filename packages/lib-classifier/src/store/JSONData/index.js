import { types } from 'mobx-state-tree'

import DataSeriesPlot from './DataSeriesPlot'
import TESSLightCurve from './TESSLightCurve'

export default types.union(DataSeriesPlot, TESSLightCurve)