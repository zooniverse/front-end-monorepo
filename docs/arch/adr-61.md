# ADR 61: Volumetric Point Tool

## Status

Proposed: 2024-08-06

## Context

As part of an NIH grant, there is a need for a 3D viewer and annotation tools for FEM. Specifically, there is a need to visualize a "cube" of data and explore it volumetrically. This ADR is focused on the method of generating and efficiently storing the annotations. A prototype of the viewer - [VolumetricViewer](https://github.com/zooniverse/volumetric-viewer) - has been developed and released for alpha testing, with the feedback being compiled into the below recommendation. 

## Decision

The Volumetric Viewer is a separate viewer than all the other viewers because of how it handles 3D data. As such, a new Tool Type and Annotation Model is needed.

## Tool Behavior
- User can click and create a control point, which triggers the tool algorithm to run in the background, generating visible active points
- User can delete a control point, which triggers re-running algorithm without the point
- User can delete an annotation, which deletes the control points and associated active points

## Data Models

### Subject Data
```js
{
  data: Base64String // Uint8 Array converted into a Base64String for storage and bandwidth efficiency
}
```

### Caesar Reduction Data
```js
{
  annotations: [
    {
      points: [<Integer:subject-point-index>],
      threshold: <Integer:0-10>
    }
  ]
  tool: 'point-volumetric',
}
```

### Annotation Model Data
```js
{
  annotations: [
    {
      points: [<Integer:subject-point-index>],
      threshold: <Integer:0-10>
    },
  ]
}
```
