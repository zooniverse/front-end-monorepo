# Subject Group Comparison Task

This Task allows users to select cells on the Subject Group Viewer's grid.
Selecting cells is a way for volunteers to say that, "hey, these images look
different from other images on the grid!"

- This task is STRONGLY ASSOCIATED with the Subject Group Viewer. Please see `src/components/Classifier/components/SubjectViewer/components/SubjectGroupViewer/README.md` for more details.
- This task is STRONGLY ASSOCIATED with the Subject Group "type" of Subjects. Please see `src/store/SubjectGroup/README.md` for more details.

The Subject Group Comparison Task was originally created by @shaunanoordin on Mar 2020, for the SURVOS project.

## Data Models

Subject Group Comparison Task data structure, example:

```
"T0":{
  help: "",
  question: "Please select the cells that look weird.",
  type: "subjectGroupComparison",
}
```

That's all! The Task Area only has a question, and nothing else.

Most of the classification interactivity resides in the Subject Group Viewer. As such, most of the setup work is done by the `workflow.configuration` set for the Subject Group Viewer.

Subject Group Comparison Task annotation (classification) data structure, example:

```
{
  "task": "T0",
  "value": [
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
  "task":"T0",
  "value": [],  // No value selected
}
```
