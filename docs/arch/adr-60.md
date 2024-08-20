# ADR 60: Volumetric Viewer

## Status

Proposed: 2024-08-06

## Context

As part of an NIH grant, there is a need for a 3D viewer and annotation tools for FEM. Specifically, there is a need to visualize a "cube" of data and explore it volumetrically. Additionally, as part a follow up ADR, a method to generate and efficiently store the annotations to the data is needed. A prototype of the viewer - [VolumetricViewer](https://github.com/zooniverse/volumetric-viewer) - has been developed and released for alpha testing, with the feedback being compiled into the below recommendation. 

## Decision

The Volumetric Viewer is a separate viewer than all the other viewers because of how it handles 3D data. The concept of pan, zoom, rotate, and annotation models take on a different level of complexity within a 3D context, therefore the viewer should be separate with tailored controls for the 3D context.

## Features

Features of the FEM Volumetric Viewer will include:
1. Configuration of Volumetric Viewer for 3D volumetric and/or 2D planar view choice
1. Mouse and/or Keyboard interactions for navigating the volumetric data in both 2D & 3D
1. Mouse and/or Keyboard interactions for annotating the volumetric data in both 2D & 3D
1. Hiding of the ImageToolbar component (pan, zoom, rotate, invert, etc)

### Viewer Configuration

```js
{
  enable2D: <Integer:0-10>,
  frame: [<Integer:x-coordinate>, <Integer:y-coordinate>, <Integer:z-coordinate>]
  threshold: <Integer:0-10>,
  tool: 'point-volumetric'
}
```
