# Geographic Map Viewer

The GeoMapViewer is a variant of the Subject Viewer that displays geographic data on an interactive map.

## Features

- interactive map display using OpenLayers

## Props

- TBD

## External Setup: Workflows and Subjects

### Workflow

The workflow must include a configuration for the GeoMapViewer:

`workflow.configuration = { subject_viewer: 'geoMap' }`

### Subject

TBD

## Layout

The GeoMapLayout is assigned to workflows with `configuration.subject_viewer` set as `geoMap`. The viewer container has a fixed height of 600px (400px on mobile). The task area is sticky positioned with a width of 20rem.
