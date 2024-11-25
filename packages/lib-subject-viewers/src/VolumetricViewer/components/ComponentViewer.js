import { object, string } from 'prop-types'
import { AlgorithmAStar } from './../helpers/AlgorithmAStar.js'
import { Cube } from './Cube.js'
import { Plane } from './Plane.js'
import { Box } from 'grommet'

export const ComponentViewer = ({
  data,
  models
}) => {
  // Initialize Annotations
  if (models.annotations) {
    models.annotations.initialize({
      algorithm: AlgorithmAStar,
      data: [], // will come from Caesar if they exist
      viewer: models.viewer
    })
  }

  // Initialize Tool
  if (models.tool) {
    models.tool.initialize({
      annotations: models.annotations
    })
  }

  // Initialize Viewer
  if (models.viewer) {
    models.viewer.initialize({
      annotations: models.annotations,
      data,
      tool: models.tool
    })
  }

  return (
    <Box direction='row' style={{ maxWidth: '800px', padding: '20px' }}>
      <Box flex>
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
      <Box flex>
        <Cube
          annotations={models.annotations}
          tool={models.tool}
          viewer={models.viewer}
        />
      </Box>
    </Box>
  )
}

ComponentViewer.propTypes = {
  data: string,
  models: object
}
