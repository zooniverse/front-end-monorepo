import { AlgorithmAStar } from './../helpers/AlgorithmAStar.js'
import { Box } from 'grommet'
import { Cube } from './Cube.js'
import { Histogram } from './Histogram.js'
import { Orientation } from './Orientation.js'
import { object, string } from 'prop-types'
import { Plane } from './Plane.js'
import styled, { css } from 'styled-components'

const StyledBox = styled(Box)`
  ${props => props.theme.dark
    ? css`
      background-color: none;
      color: #FFFFFF;
    `
    : css`
      background-color: #FFFFFF;
      color: #000000;
    `
  }
  
  border: 1px solid #E2E5E9;
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
  max-width: 975px;
  width: 100%;

  .planes-container {
    margin: 20px;
  }
  
  .volume-container {
    background-color: #000000;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    height: 590px;
    padding: 25px;
    position: relative;

    .volume-controls {
      margin-top: 25px;
      max-height: 60px;
      width: 100%;
    }

    .volume-cube {
      max-width: 430px;
      width: 100%;
    }
  }
`

export const ComponentViewer = ({
  data,
  models
}) => {
  models.annotations.initialize({
    algorithm: AlgorithmAStar,
    data: [],
    viewer: models.viewer
  })

  models.tool.initialize({
    annotations: models.annotations
  })

  models.viewer.initialize({
    annotations: models.annotations,
    data,
    tool: models.tool
  })

  return (
    <Box flex align='end'>
      <StyledBox direction='row'>
        <Box className='planes-container'>
          {models.viewer.dimensions.map((dimensionName, dimension) => {
            return (
              <Plane
                annotations={models.annotations}
                dimension={dimension}
                key={`dimension-${dimensionName}`}
                tool={models.tool}
                viewer={models.viewer}
              />
            )
          })}
        </Box>
        <Box className='volume-container' flex align='center' justify='between'>
          <Box className='volume-cube'>
            <Cube
              annotations={models.annotations}
              tool={models.tool}
              viewer={models.viewer}
            />
          </Box>
          <Box className='volume-controls' flex direction='row' justify='between'>
            <Orientation />
            <Histogram
              annotations={models.annotations}
              tool={models.tool}
              viewer={models.viewer}
            />
          </Box>
        </Box>
      </StyledBox>
    </Box>
  )
}

ComponentViewer.propTypes = {
  data: string,
  models: object
}
