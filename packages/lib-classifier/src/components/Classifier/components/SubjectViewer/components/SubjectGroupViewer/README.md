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

Note: mouse zoom/pan actions only register when the subject viewer is in 'move mode'.

When the _current task_ on the Classifier is a Subject Group Task - which usually asks users to mark the images that look different from the others - then the Subject Group Viewer...

- allows users to mark (or unmark) cells by 
- allows users to tab-navigate between cells

**Classification specifics:**

- Annotations in the form of an _array of selected cell indexes._ (Indices?)
- For example, in a 3x3 grid where the middle and bottom-middle cells are selected, the annotation submitted will look like: `[4, 7]`.
- Or maybe `[7, 4]`. The annotation doesn't bother to sort the indices. (Indexes?)
- NOTE: this is just a placeholder. Long-term, the annotations should be in the form of an _array of subject IDs,_ since a Panoptes "SubjectGroup" resource is meant to contain a group of single image subjects, with each single image subject being displayed in a single grid cell.

## External Setup

**Workflow: Configuration**

To enable the SGV, the Workflow of the project must have its `.configuration` set up.

`workflow.configuration = { subject_viewer: 'subjectGroup' }`

Optionally, the SGV can be further configured to specify a certain grid size. The example here shows how to specify a 4x3 grid, with each cell having a "native size" of 1200px x 1000px. (This will result in a grid with a "native size" of 4800px x 3000px, which will then be squished to fit the available view space of the Classifier.)

```
workflow.configuration = {
  subject_viewer: 'subjectGroup',
  subject_viewer_config: {
    cell_width: 1200,
    cell_height: 1000,
    cell_style: {
      stroke: '#fff',
      strokeWidth: '1',
      overlay: 'rgba(41,103,255,0.3)',
      selectedStroke: '#2967FF',
      selectedStrokeWidth: '8',
      focusOutline: '2px dashed rgba(255, 255, 255, 0.5)',
      background: '#000'
    },
    grid_columns: 4,
    grid_rows: 3
  }
}
```

Some notes:

- 'stroke' and 'strokeWidth' define the border around each cell, when that cell is idle (not being focused on, and not marked as selected)
- 'highlight' and 'highlightWidth' define the border around each cell, when that cell is marked/selected.
- A cell can also be in the "has keyboard focus" state or the "has keyboard focus AND has been marked/selected" state, and those state are visually represented by a combination of 'stroke' colour and 'highlightWidth' size.
- 'background' indicates the colour to fill the cell with when, e.g. the image doesn't fill the cell's available visible space.

**Subject: Group Subjects**

// TODO
