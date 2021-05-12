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

To enable the SGV, the Workflow of the project must have its `.configuration` set up. For example, this is for a 5x5 grid with 200x200px cells:

```
workflow.configuration = {
  subject_viewer: 'subjectGroup',
  subject_viewer_config: {
    cell_width: 200,
    cell_height: 200,
    grid_columns: 5,
    grid_rows: 5,
  },
  subject_group: {
    num_columns: 5,  // This must match grid_columns
    num_rows: 5,     // This must match grid_rows
  }
}
```

(Note 1: the actual size of the cells will be "squished" to fit the actual visible size of the viewer on the classifier.)

(Note 2: `subject_viewer_config` is used by the frontend UI, while `subject_group` is used by the backend service. There's a small duplication of values here, don't mind it.)

Optionally, the SGV can be further configured with specific styles.

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
    grid_columns: 5,
    grid_rows: 5
  },
  subject_group: {
    num_columns: 5,
    num_rows: 5,
  }
}
```

Some notes on cell_style:

- 'stroke' and 'strokeWidth' define the border around each cell, when that cell is idle (not being focused on, and not marked as selected)
- 'selectedStroke' and 'selectedStrokeWidth' define the border around each cell, when that cell is marked/selected.
- A cell can also be in the "has keyboard focus" state. This is visually represented by 'focusOutline'.
- 'background' indicates the colour to fill the cell with when, e.g. the image doesn't fill the cell's available visible space.

**Subject: Group Subjects**

- Subjects for the SubjectGroupViewer are a special case; a "Group Subject" is a randomised collection of X **single image Subjects** (where X = rows x columns) that the backend packages in to a single "pseudo" Subject.
- Subject Groups are called from the `/subjects/grouped` Panoptes endpoint (instead of the usual `/subjects/queued` endpoint)
  - An example request looks like `https://panoptes-staging.zooniverse.org/api/subjects/grouped?workflow_id=3412&num_rows=5&num_columns=5`
  - Note: `num_rows` and `num_columns` need to match the `workflow.configuration.subject_group` value
  - Note: as of May 2021, there is a maximum limit of 25 constituent Subjects per Subject Group
- To the frontend, a Subject Group looks almost EXACTLY like a multi-image Subject, but with extra metadata.
  - `subject.locations` has X (where X = rows x columns) number of image URLs.
  - `subject.metadata.#group_subject_ids` is a string of X Subject IDs, consisting of the Subject Group's _constituent Subject's IDs_ joined together with the dash `-` character. e.g. "134859-134722-134823-134642-134700-134888-134853-134685-134843-134619-134864-134697-134637-134624-134832-134805-134623-134788-134828-134643-134610-134795-134756-134676-134714"
  - `subject.metadata.#subject_group_id` is a number indicating the unique ID of this Subject Group, which is distinct from `subject.id`. Honestly, don't worry about this for now.
