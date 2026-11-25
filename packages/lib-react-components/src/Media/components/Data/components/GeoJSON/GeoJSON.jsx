import { Box } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

import svgMappingIcon from './svgMappingIcon'

const encodedSvgMappingIcon = encodeURIComponent(svgMappingIcon)

const StyledBox = styled(Box)`
  aspect-ratio: 213 / 166;
  background-image: url("data:image/svg+xml;charset=utf-8,${encodedSvgMappingIcon}");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
`

function GeoJSON({ alt }) {
  return <StyledBox aria-label={alt} fill role='img' />
}

GeoJSON.propTypes = {
  alt: string
}

export default GeoJSON
