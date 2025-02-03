# ADR 62: lib-subject-viewers && Volumetric Viewer

## Status

Proposed: 2024-08-06

## Context

As part of an NIH grant, there is a need for a Volumetric Viewer that supports the annotation process within the Classifier. This viewer needs to be able to view 'frames' of the volumetric data in the x, y, and z planes. The annotations need to be generated from an [x, y, z] coordinate and turned into an annotation object that can be sent to Panoptes for storage and later processing. 

## Decision

During the prototyping phase, ThreeJS was chosen to be the basis of this new viewer because of its broad and extensive support in the tech community. ThreeJS also makes utilizing the underlying data structures very simple, and creating interaction customizations straightforward. ThreeJS is also easy to support within the existing FEM architecture with few extra dependencies. Because interacting with 3D data is fundamentally different than any other viewer within FEM, a new Task, Tool, and Annotation will be written within FEM to support the new Viewer.

The `lib-subject-viewers` package is being created to store the source code for the Volumetric Viewer. This decision is meant to follow the existing architectural pattern of de-coupling major components of FEM and enable incremental loading of code depending on its need in the application. 

Within `lib-classifier`, there is a new `VolumetricViewerWrapper` component that ties together the Volumetric Viewer in `lib-subject-viewers` with the Classifier's state management, which uses MobX, with the internal state management of the Volumetric Viewer. This component lives within the `SubjectViewer` component alongside the other existing viewers. Because of this component, the `lib-subject-viewers` VolumetricViewer is able to be loaded asynchronously, keeping core `lib-classifier` bundle size at a minimum.

To enable the Volumetric Viewer within a Project, an experimental feature flag called `volumetricViewer` has been created. Once enabled, alongside the `femLab` experimental feature flag, the Project Builder shows a new task called `Volumetric Task`. This task, when added, instructs FEM to load the Volumetric Viewer from `lib-subject-viewers`.

Within the experimental tasks section of `lib-classifier`, the `VolumetricTask` component and `VolumetricAnnotation` model have been defined to support both the new task and annotation of the Volumetric Viewer as is needed for state management support within MobX. 

### Subject Data

```json
Base64String // Uint8 Array converted into a Base64String for storage and bandwidth efficiency
```

The VolumetricViewer supports a Base64 encoded string that is converted into a uint8 array. The decision to use a Base64 encoded string is to decrease the file size of volumetric data within Panoptes and the bandwidth needed to transfer the data as a network request. Data uploaded should have the `json` extension as it is used for fetching the correct file from Panoptes.

## Features

Features of the Volumetric Viewer will include:
1. Mouse interactions for rotating the volumetric data 3D
1. Mouse interactions for choosing different frames of the volumetric data in 2D
1. Mouse interactions for annotating the volumetric data in both 2D & 3D
