# Subject Group Comparison Task

This Task allows users to select cells on the Subject Group Viewer's grid.
Selecting cells is a way for volunteers to say that, "hey, these images look
different from other images on the grid!"

- This task is STRONGLY ASSOCIATED with the Subject Group Viewer. Please see `src/components/Classifier/components/SubjectViewer/components/SubjectGroupViewer/README.md` for more details.
- This task is STRONGLY ASSOCIATED with the Subject Group "type" of Subjects. Please see `src/store/SubjectGroup/README.md` for more details.

The Subject Group Comparison Task was originally created by @shaunanoordin on Mar 2020, for the SURVOS project.

## Data Models

### Task Model

Subject Group Comparison Task data structure, example 1 (no subtasks):

```
"T0": {
  details: [],
  help: "",
  question: "Please select the cells that look weird.",
  type: "subjectGroupComparison",
}
```

Example 2 (with one subtask):

```
"T0": {
  details: [
    {
      help: "",
      type: "text",
      required: false,
      instruction: "What's weird about this cell?"
    }
  ],
  help: "",
  question: "Please select the cells that look weird.",
  type: "subjectGroupComparison",
}
```

- The Task Area only has a question, and nothing else.
- The `.details` attribute specifies Subtasks.
  - Subtasks are optional. In fact, early versions of the SubjectGroupComparisonTask omitted the `.details` attribute altogether.
  - SubTasks work similarly to Drawing Tools' Subtasks.
- ⚠️ As of Oct 2025, the PFE Project Builder doesn't add a `.next` attribute to Subject Group Comparison Tasks. We haven't actually tested a Subject Group-type workflow that has more than one Subject Group Comparison Task, and we're not sure having more than one task of this type makes any sense. 🤔

Most of the classification interactivity resides in the Subject Group Viewer. As such, most of the setup work is done by the `workflow.configuration` set for the Subject Group Viewer.

### Annotation Model(s)

Subject Group Comparison Task annotation (classification) data structure, example 1 **(no subtasks)**:

```
classification.annotations[0] = {
  task: "T0",
  value: [
    {index: 6, subject: "134853"},
    {index: 12, subject: "134637"},
    {index: 18, subject: "134828"},
  ]
}
```

The value is an _array of selected cells._ A single selected cell contains two values: the index of the cell on the grid (e.g. say you have a 3x3 grid. The top-left cell is index 0 ; the top-middle cell is index 1 ; the bottom-right cell is index 8), and the ID of the constituent Subject that the cell represents.

NOTE: if no cell was selected (as is the case when initially rendered), the annotation value is an empty array.

```
{
  task: "T0",
  value: [],  // No value selected
}
```

Subject Group Comparison Task annotation (classification) data structure, example 2 **(with subtasks)**:

```
classification.annotations = [
  {
    task: "T0",
    value: [
      {index: 6, subject: "134853", details: [{ task: "T0.cell.6.subtask.0"}]},
      {index: 12, subject: "134637", details: [{ task: "T0.cell.12.subtask.0"}]}},
      {index: 18, subject: "134828", details: [{ task: "T0.cell.18.subtask.0"}]}},
    ]
  },
  {
    task: "T0.cell.6.subtask.0",
    taskType: "text",
    value: "This galaxy kinda looks like a penguin",
    cellIndex: 0
  },
  ...
]
```

`subTaskAnnotation.cellIndex` corresponds to the index of the selected cell, in `mainTaskAnnotation.value[]`.