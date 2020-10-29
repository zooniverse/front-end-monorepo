# ADR 27: Subject Viewer Config

Created: June 26, 2020

## Context

A workflow determines which subject viewer to use with the `workflow.configuration.subject_viewer` property. Subject viewers include `singleImage`, `lightCurve`, `multiFrame`, and `subjectGroup` at creation of this ADR. Some subject viewers can utilize, or require, additional configuration information.

### [multiFrame](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/components/MultiFrameViewer)

A workflow using the multi-frame subject viewer might have a preference regarding:

- marks per frame: some might prefer marks filtered per frame, like a transcription workflow where each frame represents a unique page to transcribe with marks only relevant to each page, while other workflows might prefer marks persist between frames like [Space Warps](https://www.zooniverse.org/projects/aprajita/space-warps-hsc/classify) or [Power to the People](https://www.zooniverse.org/projects/alycialeonard/power-to-the-people). However, after reviewing projects that enabled marks to persist between frames (`multi_image_clone_markers` [in PFE](https://github.com/zooniverse/Panoptes-Front-End/blob/master/app/classifier/tasks/drawing/markings-renderer.cjsx#L55)) it appears the PFE setting is unclear, as a few of the related workflows do not include a drawing task or the subjects do not have multiple frames.
- positioning: some might prefer pan, zoom, and rotation reset per frame, like a transcription workflow where each frame represents a unique page to transcribe, while other workflows might prefer pan, zoom, and rotation maintained between frames, like [Wildcam Gorongosa](https://www.zooniverse.org/projects/zooniverse/wildcam-gorongosa/classify) or [Backyard Worlds](https://www.zooniverse.org/projects/marckuchner/backyard-worlds-planet-9/classify) (in flipbook mode, not separate frames)

### [subjectGroup](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/components/SubjectGroupViewer)

- A workflow using the subject-group subject viewer might want to define the subject cell width, height, or style, or the subject viewer grid columns or grid rows.

## Decision

Subject viewer configuration is an object stored in `workflow.configuration.subject_viewer_config` and is structured as follows for the subject viewers noted:

`multiFrame`:

```javascript
{
  filter_marks_per_frame: <boolean>  // replaces multi_image_clone_markers in PFE
  positioning: <enumerable> // includes pan, zoom, and rotation, enumerable i.e. "maintain", "reset"
}
```

`subjectGroup`:

```javascript
{
  cell_width: <number of pixels>
  cell_height: <number of pixels>
  cell_style: { [CSS property]: <CSS property value> }
  grid_columns: <number>
  grid_rows: <number>
}
```

Subject viewers to define the configuration object in the related subject viewer README, if applicable.
The ScatterPlotViewer and BarChartViewer accept a configuration object directly in the JSON structure of the subject data to support variability in the display settings including the plot labels since it's possible this might vary per subject. The `subject_viewer_config` object should only be used for  configuration options that apply to all subjects linked to the workflow. 
## Status

Proposed

## Consequences

- When a workflow selects a subject viewer the related `subject_viewer_config` is defined, if applicable
- Subject viewers that utilize a `subject_viewer_config` define default fallbacks
