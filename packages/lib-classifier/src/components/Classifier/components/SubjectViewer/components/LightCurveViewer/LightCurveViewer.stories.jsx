import { Box } from 'grommet'
import * as d3 from 'd3'
import { zip } from 'lodash'
import LightCurveViewer from './LightCurveViewer'
import kepler from '../../helpers/mockLightCurves/kepler'
import readme from './README.md'

const mockData = kepler

const dataPoints = zip(mockData.x, mockData.y)
const dataExtent = {
  x: d3.extent(mockData.x),
  y: d3.extent(mockData.y)
}

export default {
  title: 'Subject Viewers / LightCurveViewer',
  component: LightCurveViewer,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = () => {
  return (
    <Box height='medium' width='large'>
      <LightCurveViewer
        dataExtent={dataExtent}
        dataPoints={dataPoints}
        setOnPan={() => {}}
        setOnZoom={() => {}}
      />
    </Box>
  )
}
