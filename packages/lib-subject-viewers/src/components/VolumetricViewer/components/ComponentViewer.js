import { AlgorithmAStar } from "./AlgorithmAStar.js";
import { Config } from "./Config.js";
import { Cube } from "./Cube.js";
import { Plane } from "./Plane.js";
import { Box } from 'grommet'

export const ComponentViewer = ({
  config,
  data,
  models,
}) => {
  // Initialize the underlying models
  if (models.annotations) {
    models.annotations.initialize({
      algorithm: AlgorithmAStar,
      algorithmRunOnInit: true,
      data: [], // will come from Caesar if they exist
      tool: models.tool,
      viewer: models.viewer,
    });
  }

  // Tool
  if (models.tool) {
    models.tool.initialize({
      annotations: models.annotations,
      viewer: models.viewer,
    });
  }

  // Viewer
  if (models.viewer) {
    models.viewer.initialize({
      annotations: models.annotations,
      data,
      tool: models.tool,
    });
  }

  return (
    <Box direction="row">
      <Box flex={true}>
        {models.viewer.dimensions.map((dimensionName, dimension) => {
          return (
            <Plane
              annotations={models.annotations}
              dimension={dimension}
              key={`dimension-${dimensionName}`}
              tool={models.tool}
              viewer={models.viewer}
            />
          );
        })}
      </Box>
      <Box flex={true}>
        <Cube
          annotations={models.annotations}
          tool={models.tool}
          viewer={models.viewer}
        />
      </Box>
    </Box>
  );
};
