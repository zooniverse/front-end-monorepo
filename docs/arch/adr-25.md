# ADR 25: Drawing Sub-task 

Created: January 6, 2020

## Context

A drawing mark's sub-task is designed to support volunteers answering additional questions for each drawing mark annotation. It allows single choice or multiple choice question task, text task, dropdown task, and slider task.

### Annotation JSON structure

The current sub-task annotation JSON structure is:

```json
// a point with sub-task consisting of a question task and a dropdown task
{"annotations": [
  {
    "task": "T0",
    "value": [
      {
        "frame": 0,
        "tool": 0,
        "x": 452.18341064453125,
        "y": 202.87478637695312,
        "details": [
          {"value": 0},
          {"value": [
            {"option-1": 1},
            {"option-2": 1},
            {"None": 1}
          ]}
        ]
      },
      {
        "frame": 0,
        "tool": 1,
        "x": 404.61279296875,
        "y": 583.4398803710938,
        "details": [
          {"value": 1},
          {"value": [
          {"option-3": 1},
          {"option-4": 1},
          {"option-5": 1}
        ]}
      ]
    }
  ]}
]}
```

This annotation structure has a few issues because it solely relies on an array index to relate back to the original task. This makes it difficult to make downstream analysis and aggregation scripts. The aggregation code now has to parse the details array and make a "mock annotation" of the correct structure to be passed along to the next reducer.

### Sub-task UI

The sub-task UI positioned itself fixed below relative to the position of the mark. Notably transcription projects have commented that this interferes with being able to transcribe successfully since the dialog may cover up part of the subject and cannot be moved without moving the drawing mark.

## Decision

For initial support, we will support the single and multiple choice question tasks and the text task in the sub-task. Slider task may be deprecated and dropdown task may be changing in ways we do not have a plan for yet, so they can be supported later if it makes sense to add them.

### Annotation JSON structure

The annotations in the details array will be updated to be an object that just contains a reference to the task's unique identifier. The task annotation itself will be stored in the classification's annotations flattened. 

The main benefit of this reorganization will be with downstream analysis and aggregation. When aggregating drawn shapes the first step is clustering. Once the clusters are found the subtasks need to be aggregated within each cluster. This will be easier to do if the structure of each subtask annotation is the same as if that task was asked on its own. The code can just take all subtask annotations within a cluster and just pass it to the reducer as if it is a list of main task annotations without having to reshape them.

An example of the new sub-task annotation JSON structure:

```json
{"annotations": [
  {
    "task": "T0",
    "taskType": "drawing",
    "value": [
      {
        "frame": 0,
        "tool": 0,
        "toolType": "point",
        "x": 452.18341064453125,
        "y": 202.87478637695312,
        "details": [
          {"task": "T0.0.0.0"},
          {"task": "T0.0.0.1"}
        ]
      },
      {
        "frame": 0,
        "tool": 1,
        "toolType": "point",
        "x": 404.61279296875,
        "y": 583.4398803710938,
        "value_index": 1,
        "details": [
          {"task": "T0.1.1.0"},
          {"task": "T0.1.1.1"}
        ]
      }
    ]
  },
  {
    "task": "T0.0.0.0",
    "taskType": "single",
    "value": 0
  },
  {
    "task": "T0.0.0.1",
    "taskType": "dropdown",
    "value":[
      {"option-1": 1},
      {"option-2": 1},
      {"None": 1}
    ]
  },
  {
    "task": "T0.1.1.0",
    "taskType": "single",
    "value": 1
  },
  {
    "task": "T0.1.1.1",
    "taskType": "dropdown",
    "value": [
      {"option-3": 1},
      {"option-4": 1},
      {"option-5": 1}
    ]
  }
]}
```

The sub-task identifiers follow a convention of `TASK_KEY.ANNOTATION_INDEX.TOOL_INDEX.DETAILS_INDEX`.

### Drawing sub-task UI

The UI will change to adopt the design of Anti-Slavery Manuscripts (ASM) with this [generalized design](https://projects.invisionapp.com/d/main#/console/12923997/396381420/preview). It will be a pseudo-modal, but with a few notable differences from a true modal:

- The initial position will be near the associated mark made
- Interactions will be allowed with the image toolbar to allow zoom, rotate, as well as opening of the tutorial, field guide, and task help. Submission of the classification should not be allowed.
  - If the sub-tasks are required, the modal should not be closeable until the required annotations are made or the mark is deleted if cancelled
- The dialog can be moved and resized

To support movability and resizing, we will leverage [react-rnd](https://github.com/bokuweb/react-rnd) which is the same library ASM used. Grommet's `Layer` cannot be used since it is intended for actual modal or side panel use and cannot be arbitrarily positioned or moved.

## Status

Proposed

## Consequences

Flattening the annotations array for drawing task sub-tasks is conceptually consistent with the move to using workflow steps to flatten the combo task. It is however a breaking change and this change will have to be communicated to project builders. As with other classifications from the new classifier, this can be checked by the presence of `classifier_version: 2.0` in the classification metadata. In the future, we would also like to include a link to json schema for each annotation type as recommended in [ADR 07](adr-07.md).

Flattening also has added benefits for Panoptes when generating classification exports. It can parse through a flattened array to convert machine readable strings to human readable strings for each task without having to check for values in a nested `details` array and then traverse it. In the raw classification export, this also benefits researchers that want to analyze the outputted CSV directly and prefer a flatter json structure.

The transcription task is a automatically configured drawing task with a sub-task and will be using a new variant of a text task that includes auto-suggestions from caesar reductions. Its sub-task should use the suggested changes from this ADR as well.
