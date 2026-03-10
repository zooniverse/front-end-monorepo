import { types } from 'mobx-state-tree'

import BarChart from './BarChart'
import DataSeriesPlot from './DataSeriesPlot'
import GeoJSON from './GeoJSON'
import TESSLightCurve from './TESSLightCurve'
import Volumetric from './Volumetric'

// NOTE: Union order is intentional. Similar, but not identical, to lib-classifier/src/store/JSONData/index.js.
// MST union matching can be order-sensitive when model snapshots overlap,
// so changing this order may change which model a payload resolves to.
// This react-components package includes Volumetric in the union.
export default types.union(GeoJSON, BarChart, DataSeriesPlot, Volumetric, TESSLightCurve)
