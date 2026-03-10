import { types } from 'mobx-state-tree'

import BarChart from './BarChart'
import DataSeriesPlot from './DataSeriesPlot'
import GeoJSON from './GeoJSON'
import TESSLightCurve from './TESSLightCurve'
import VariableStarPlots from './VariableStarPlots'

// NOTE: Union order is intentional. Similar, but not identical, to lib-react-components/src/types/JSONData/index.js.
// MST union matching can be order-sensitive when model snapshots overlap,
// so changing this order may change which model a payload resolves to.
// This classifier package includes VariableStarPlots in the union.
export default types.union(GeoJSON, BarChart, DataSeriesPlot, VariableStarPlots, TESSLightCurve)
