import { Box } from 'grommet'
import { Cube } from './Cube.js'
import { Histogram } from './Histogram.js'
import { MarkButtons } from './MarkButtons.js'
import { object } from 'prop-types'
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
      border: .5px solid #A6A7A9;
      border-bottom: none;
      color: #000000;
    `
  }
  
  border-radius: 16px;
  width: 100%;
  
  .volume-container {
    background-color: #000000;
    border-bottom-left-radius: 16px;
    position: relative;

    .volume-cube {
      width: 100%;
    }
  }

  @media (width > 1200px) {
    max-width: 975px;

    .planes-container {
      margin: 20px;
    }

    .volume-container {
      height: 575px;
      min-width: 330px;
      padding: 20px;
      border-top-right-radius: 16px;

      .volume-cube {
        max-width: 460px;
      }

      .volume-controls {
        margin-top: 0;
        max-height: 60px;
        width: 100%;
      }
    }
  }
  
  @media (width <= 1200px) {
    background: none;
    border: none;
    flex-direction: column-reverse;
    max-width: 410px;

    .planes-container {
      margin: 20px 0 20px 20px;
    }

    .volume-container {
      border-radius: 16px;
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

  .no-select {
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    pointer-events: auto;
    touch-action: none;
    user-drag: none;
    user-select: none;
  }
`

export const ComponentViewerDefault = ({ models }) => {
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

ComponentViewerDefault.propTypes = {
  models: object
}
