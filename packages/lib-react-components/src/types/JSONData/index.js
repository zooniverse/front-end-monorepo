import { types } from 'mobx-state-tree'

import BarChart from './BarChart'
import DataSeriesPlot from './DataSeriesPlot'
import GeoJSON from './GeoJSON'
import TESSLightCurve from './TESSLightCurve'
import Volumetric from './Volumetric'

export default types.union(GeoJSON, BarChart, DataSeriesPlot, Volumetric, TESSLightCurve)
