import { Box } from 'grommet'
import styled, { css } from 'styled-components'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'
import { useJSONData } from '../../../hooks'
import * as Viewers from './components'

function isGeoJSON(data) {
  if (data?.type === 'FeatureCollection') return Array.isArray(data.features)
  return data?.type === 'Feature' && 'geometry' in data
}

function getViewerType(type, data) {
  if (type === 'TESSLightCurve') return 'DataSeriesPlot'
  if (isGeoJSON(data)) return 'GeoJSON'
  return type
}

const StyledBox = styled(Box)`
  ${props => props.maxHeight && css`max-height: ${props.maxHeight}px;`}
  ${props => props.maxWidth && css`max-width: ${props.maxWidth}px;`}
`

export default function Data({
  alt = defaultProps.alt,
  controls = defaultProps.controls,
  flex = defaultProps.flex,
  height = defaultProps.height,
  showAxes = defaultProps.showAxes,
  showLegend = defaultProps.showLegend,
  src = defaultProps.src,
  width = defaultProps.width,
  ...rest
}) {
  const { data: jsonData, type, loading, error } = useJSONData(src)
  let content = null

  if (loading) {
    content = null
  }

  if (error) {
    content = <p>{error.message}</p>
  }
  
  if (jsonData) {
    const viewerType = getViewerType(type, jsonData)
    const viewerData = type === 'TESSLightCurve'
      ? {
        data: jsonData,
        chartOptions: {
          xAxisLabel: 'Days',
          xAxisLabelOffset: -10,
          yAxisLabel: 'Brightness',
          yAxisLabelOffset: 10
        },
        seriesOptions: {
          color: 'white'
        }
      }
      : jsonData
    const Viewer = Viewers[viewerType] || Viewers.JSONViewer

    content = <Viewer alt={alt} jsonData={viewerData} showAxes={showAxes} showLegend={showLegend} />
  }

  return (
    <StyledBox
      data-testid='data-viewer'
      flex={flex}
      height='100%'
      maxWidth={width}
      maxHeight={height}
      width='100%'
      {...rest}
    >
      { content }
    </StyledBox>
  )
}

Data.propTypes = {
  ...propTypes
}

