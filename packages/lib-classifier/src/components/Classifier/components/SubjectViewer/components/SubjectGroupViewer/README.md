# Subject Group Viewer

The Subject Group Viewer (SGV) is a variant of the Subject Viewer that's used to 
display Subjects containing an array of sub-Subjects, with each sub-Subject
shown on a grid.

The Subject Group Viewer was originally created by @shaun.a.noordin on Mar 2020, for the SURVOS project.

## Features

**Intent:**

The Subject Group Viewer's is designed to address two specific needs:

- (UI/UX) allow volunteers to compare a large number of "images" (possible extension: videos too) side-by-side.
  - _Technical: each "image" is actually its own single-image Subject. This super-grouping of single-image Subjects is a variant of a Subject resource called a "SubjectGroup", i.e. a Subject that contains Subjects._
- (Classification) allow volunteers to select any number of cells to answer the Task question. (e.g. "which of these images look blurry?")
  - _Technical: this requires a uniqe Classification task, and the answer will be submitted as an array of Subject IDs._

**UI/UX specifics:**

The Subject Group Viewer...

- displays Subjects in a grid of X by Y cells.
- lets you pan the view via mouse-drag or keyboard (arrow keys). 
- lets you zoom the view via mouse-wheel, keyboard (+ and - keys), or pressing the zoom in/zoom out buttons on the Image Toolbar component.
- panning the view in one cell causes all cells to pan.
- zooming the view in one cell causes all cells to zoom in/out.

**Classification specifics:**

// TODO

## External Setup

**Workflow: Configuration**

To enable the SGV, the Workflow of the project must have its `.configuration` set up.

`workflow.configuration = { subject_viewer: 'subjectGroup' }`

Optionally, the SGV can be further configured to specify a certain grid size. The example here shows how to specify a 4x3 grid, with each cell having a "native size" of 1200px x 1000px. (This will result in a grid with a "native size" of 4800px x 3000px, which will then be squished to fit the available view space of the Classifier.)

```
workflow.configuration = {
  subject_viewer: 'subjectGroup',
  cell_width: 1200,
  cell_height: 1000,
  cell_style: {
    stroke: '#fff',
    strokeWidth: '4',
    fill: '#000'
  },
  grid_columns: 4,
  grid_rows: 3
}
```

**Subject: Group Subjects**

// TODO
