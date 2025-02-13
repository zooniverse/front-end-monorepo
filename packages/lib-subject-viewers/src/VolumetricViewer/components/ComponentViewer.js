import { AlgorithmAStar } from './../helpers/AlgorithmAStar.js'
import { Box } from 'grommet'
import { Cube } from './Cube.js'
import { Histogram } from './Histogram.js'
import { MarkButtons } from './MarkButtons.js'
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
      border: 1px solid #E2E5E9;
      color: #000000;
    `
  }
  
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
  width: 100%;
  
  .volume-container {
    background-color: #000000;
    position: relative;

    .volume-cube {
      width: 100%;
    }
  }

  @media (width > 1325px) {
    max-width: 975px;

    .planes-container {
      margin: 20px;
    }

    .volume-container {
      height: 590px;
      min-width: 330px;
      padding: 20px;

      .volume-cube {
        max-width: 460px;
      }

      .volume-controls {
        margin-top: 20px;
        max-height: 60px;
        width: 100%;
      }
    }
  }
  
  @media (width <= 1325px) {
    background: none;
    border: none;
    flex-direction: column-reverse;
    max-width: 410px;

    .planes-container {
      margin: 20px 0 20px 20px;
    }

    .volume-container {
      border-radius: 16px;
      border-top-right-radius: 0;
      margin: 0 0 0 20px;
      width: 390px;

      .volume-cube {
        max-width: 325px;
        width: 100%;
      }

      .volume-controls {
        margin: 20px 0;
        width: 90%;
      }
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
            <MarkButtons
              annotations={models.annotations}
            />

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
