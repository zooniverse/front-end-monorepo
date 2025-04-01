# Volumetric Task

The volumetric task is a task type designed for use with structured volumetric JSON, as part of an NIH neuron mapping project. The task is a drawing/click-oriented task that constructs volumetric annotation data based on the clicked point in 3D space.

The volumetric task requires subjects with a location of application/json mime type. The subject's location content is used to initialize the structured subject data to be annotated.

The volumetric task does not support a required property.

The volumetric task does not support tags (i.e. insertion, deletion).

The volumetric task is disabled until the subject is loaded.

## VolumetricAnnotation

The volumetric annotation consists of the following structure:

```json
{
  "label": "Annotation #1",
  "threshold": 15,
  "points": {
    "active": [{ "x": 1, "y": 1, "z": 1 }],
    "connected": [[{ "x": 1, "y": 1, "z": 1 }]],
    "all": [{ "x": 1, "y": 1, "z": 1 }]
  }
}
```

- **threshold**: the value the A* algorithm uses to choose connected points
- **points.active**: the individual voxel the user clicks
- **points.connected**: the voxels connected to the index-adjusted active voxel using the threshold value for the a* algorithm
- **points.all**: collapsed array of all points in active and connected