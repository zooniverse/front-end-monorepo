# ADR 62: lib-subject-viewers && Volumetric Viewer

## Status

Approved

## Context

As part of an NIH grant, there is a need for a Volumetric Viewer that supports the annotation process within the Classifier. This viewer needs to be able to view 'frames' of the volumetric data in the x, y, and z planes. The annotations need to be generated from an [x, y, z] coordinate and turned into an annotation object that can be sent to Panoptes for storage and later processing. 

## Decision

During the prototyping phase, ThreeJS was chosen to be the basis of this new viewer because of its broad and extensive support in the tech community. ThreeJS also makes utilizing the underlying data structures very simple, and creating interaction customizations straightforward. ThreeJS is also easy to support within the existing FEM architecture with few extra dependencies. Because interacting with 3D data is fundamentally different than any other viewer within FEM, a new Task, Tool, and Annotation will be written within FEM to support the new Viewer. Two alternative approaches were considered and rejected: 1) neuroimaging specific libraries that focused on loading specific file formats provided limited customization for interaction, 2) vector-based annotations required mathematical calculations on underlying raster/voxel data instead of operating on raster data directly.

The `lib-subject-viewers` package is being created to store the source code for the Volumetric Viewer. This decision is meant to follow the existing architectural pattern of de-coupling major components of FEM and enable incremental loading of code depending on its need in the application. 

Within `lib-classifier`, there is a new `VolumetricViewerWrapper` component that ties together the Volumetric Viewer in `lib-subject-viewers` with the Classifier's state management, which uses MobX, with the internal state management of the Volumetric Viewer. This component lives within the `SubjectViewer` component alongside the other existing viewers. Because of this component, the `lib-subject-viewers` VolumetricViewer is able to be loaded asynchronously, keeping core `lib-classifier` bundle size at a minimum.

To enable the Volumetric Viewer within a Project, an experimental feature flag called `volumetricProject` has been created. Once enabled, alongside the `femLab` experimental feature flag, the Project Builder shows a new task called `Volumetric Task`. This task, when added, instructs FEM to load the Volumetric Viewer from `lib-subject-viewers`.

Within the experimental tasks section of `lib-classifier`, the `VolumetricTask` component and `VolumetricAnnotation` model have been defined to support both the new task and annotation of the Volumetric Viewer as is needed for state management support within MobX. 

### Subject Data

```json
{
  "data": "BASE64STRING",
  "type": "volumetric"
}
```

The VolumetricViewer supports a Base64 encoded string that is converted into a uint8 array. The decision to use a Base64 encoded string is to decrease the file size of volumetric data within Panoptes and the bandwidth needed to transfer the data as a network request. Data uploaded should have the `json` extension as it is used for fetching the correct file from Panoptes.

In order for Volumetric JSON subjects to be visible as a subject preview anywhere on the frontend, particularly in the Talk > Favorites collection, it is important to add a `metadata:volumetric` column to the manifest file with a value of `true`. This is due to Talk > Favorites not containing project context, it cannot know the `volumetricProject` experimental flag, and subject preview presentational components need to detect the _type_ of JSON. Otherwise, in order to display a Volumetric subject without the metadata property, the subject's data would have to be fully fetched in order to detect the subject type.

## Features

Features of the Volumetric Viewer include:
1. Buttons for creating a new mark, undoing an addition to a mark, and deleting a mark
1. Histogram that filters voxels based on [0-255] value
1. Mouse interactions for rotating the volumetric data 3D
1. Mouse interactions for choosing different frames of the volumetric data in 2D
1. Mouse interactions for annotating the volumetric data in both 2D & 3D
1. Keyboard interactions for accessibility in choosing different frames and selecting buttons

## Consequences
- ThreeJS is a large library as a dependency, therefore:
  - It is asynchronously imported in FEM
  - It is manually trimmed and embedded locally to reduce file size in PFE
- Testing ThreeJS in specs is not easily doable due to WebGL, therefore no specs are written to test UI interactions / rendering
- Subject size is limited to 128^3 as it generates a ~2MB subject
- Requires both the `volumetricProject` and `femLab` feature flags within project configuration
- Requires `metadata:volumetric` to have a value of `true` in the subject manifest / on subject upload for subject previews to work properly
- Mobile interaction has limited functionality
