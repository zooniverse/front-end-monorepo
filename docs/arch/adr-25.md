# ADR 25: Drawing Sub-task 

Created: January 6, 2020
Updated: April 30, 2020

## Context

A drawing mark's sub-task is designed to support volunteers answering additional questions for each drawing mark annotation. It allows single choice or multiple choice question task, text task, dropdown task, and slider task.

### Annotation JSON structure

The current sub-task annotation JSON structure is:

```json
// a point with sub-task consisting of a question task and a dropdown task
{
  "annotations": [
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
              {"value": "option-1"},
              {"value": "option-2"},
              {"value": null}
            ]}
          ]
        },
        {
          "frame": 0,
          "tool": 0,
          "x": 374.23454574576868,
          "y": 455.23453656547428,
          "details": [
            {"value": 1},
            {"value": [
              {"value": "option-3"},
              {"value": "option-4"},
              {"value": "option-5"}
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
              {"value": "option-3"},
              {"value": "option-4"},
              {"value": "option-5"}
            ]}
          ]
        }
      ]
    }
  ]
}
```

The annotation structure for the sub-task, under `details`, has a few issues because it solely relies on an array index to relate back to the original sub-task. This makes it difficult to make downstream analysis and aggregation scripts. The aggregation code now has to parse the details array and make a "mock annotation" of the correct structure to be passed along to the next reducer.

### Sub-task UI

The sub-task UI positioned itself fixed below relative to the position of the mark. Notably transcription projects have commented that this interferes with being able to transcribe successfully since the dialog may cover up part of the subject and cannot be moved without moving the drawing mark.

## Decision

For initial support, we will support the single and multiple choice question tasks and the text task in the sub-task. Slider task may be deprecated and dropdown task may be changing in ways we do not have a plan for yet, so they can be supported later if it makes sense to add them.

### Annotation JSON structure

The annotations in the details array will be updated to be an object that just contains a reference to the sub-task's unique identifier. The task annotation itself will be stored in the classification's annotations array flattened. 

The main benefit of this reorganization will be with downstream analysis and aggregation. When aggregating drawn shapes the first step is clustering. Once the clusters are found the subtasks need to be aggregated within each cluster. This will be easier to do if the structure of each subtask annotation is the same as if that task was asked on its own. The code can just take all subtask annotations within a cluster and just pass it to the reducer as if it is a list of main task annotations without having to reshape them.

An addition of `markIndex` is being added for the sub-task annotations for the purpose of having an identifier relating it back to the parent drawing task annotation value array which represents marks. 

An example of the new sub-task annotation JSON structure at classification submission:

```json
{
  "annotations": [
    {
      "task": "T0",
      "taskType": "drawing",
      "value": [
        {
          "frame": 0,
          "toolIndex": 0,
          "toolType": "point",
          "x": 452.18341064453125,
          "y": 202.87478637695312,
          "details": [
            {"task": "T0.0.0"},
            {"task": "T0.0.1"}
          ]
        },
        {
          "frame": 0,
          "toolIndex": 0,
          "toolType": "point",
          "x": 374.23454574576868,
          "y": 455.23453656547428,
          "details": [
            {"task": "T0.0.0"},
            {"task": "T0.0.1"}
          ]
        },
        {
          "frame": 0,
          "toolIndex": 1,
          "toolType": "point",
          "x": 404.61279296875,
          "y": 583.4398803710938,
          "details": [
            {"task": "T0.1.0"},
            {"task": "T0.1.1"}
          ]
        }
      ]
    },
    {
      "task": "T0.0.0",
      "taskType": "single",
      "markIndex": 0,
      "value": 0
    },
    {
      "task": "T0.0.1",
      "taskType": "dropdown",
      "markIndex": 0,
      "value": [
        {"value": "option-1"},
        {"value": "option-2"},
        {"value": null}
      ]
    },
    {
      "task": "T0.0.0",
      "taskType": "single",
      "markIndex": 1,
      "value": 1
    },
    {
      "task": "T0.0.1",
      "taskType": "dropdown",
      "markIndex": 1,
      "value": [
        {"value": "option-3"},
        {"value": "option-4"},
        {"value": "option-5"}
      ]
    },
    {
      "task": "T0.1.0",
      "markIndex": 2,
      "taskType": "single",
      "value": 1
    },
    {
      "task": "T0.1.1",
      "markIndex": 2,
      "taskType": "dropdown",
      "value": [
        {"value": "option-3"},
        {"value": "option-4"},
        {"value": "option-5"}
      ]
    }
  ],
  "metadata": {
    "classifier_version": "2.0"
  }
}
```

The sub-task identifiers follow a convention of `TASK_KEY.TOOL_INDEX.DETAILS_INDEX`.

Note that this is the structure at classification submission. The classifier's internal store models may have differences for the purposes of keeping track of in-progress annotations and marks being made.

### Drawing sub-task UI

The UI will change to adopt the design of Anti-Slavery Manuscripts (ASM) with this [generalized design](https://projects.invisionapp.com/d/main#/console/12923997/396381420/preview). It will be a pseudo-modal, but with a few notable differences from a true modal:

- The initial position will be near the associated mark made
- Interactions will be allowed with the image toolbar to allow zoom, rotate, as well as opening of the tutorial, field guide, and task help. Submission of the classification should not be allowed.
  - If the sub-tasks are required, the modal should not be closeable until the required annotations are made or the mark is deleted if cancelled
- The dialog can be moved and resized

To support movability and resizing, we will leverage [react-rnd](https://github.com/bokuweb/react-rnd) which is the same library ASM used. Grommet's `Layer` cannot be used since it is intended for actual modal or side panel use and cannot be arbitrarily positioned or moved.

## Status

Accepted

## Consequences

Flattening the annotations array for drawing task sub-tasks is conceptually consistent with the move to using workflow steps to flatten the combo task. It is however a breaking change and this change will have to be communicated to project builders. As with other classifications from the new classifier, this can be checked by the presence of `classifier_version: 2.0` in the classification metadata. In the future, we would also like to include a link to JSON schema for each annotation type as recommended in [ADR 07](adr-07.md).

Flattening also has added benefits for Panoptes when generating classification exports. It can parse through a flattened array to convert machine readable strings to human readable strings for each task without having to check for values in a nested `details` array and then traverse it. 

In the raw classification export, this also benefits researchers that want to analyze the outputted CSV directly and prefer a flatter JSON structure. Flat structures facilitate research teams being able to load data without JSON-based manipulation. There are many teams who would benefit from the ability to read-in a CSV to Excel and start analyzing their results, as opposed to needing to first parse JSON. There will still be some JSON structure in CSV exports, but this will contribute toward minimizing it. 

The transcription task is a automatically configured drawing task with a sub-task and will be using a new variant of a text task that includes auto-suggestions from caesar reductions. Its sub-task should use the suggested changes from this ADR as well.

### Aggregation 

The aggregation for caesar code needed to be updated to accommodate the new annotation structure for sub-tasks. PR [289](https://github.com/zooniverse/aggregation-for-caesar/pull/289) implements these changes. Here is a sample extractor and reducer using the new code:

#### Setting up the extractor
To set up and extractor you need to URL encode the keywords

```json
{
    "task": "T0",
    "shape": "point",
    "details": {
        "T0_toolIndex0_subtask0": "question_extractor",
        "T0_toolIndex0_subtask1": "dropdown_extractor",
        "T0_toolIndex1_subtask0": "question_extractor",
        "T0_toolIndex1_subtask1": "dropdown_extractor"
    }
}
```

and that looks like
`https://aggregation-caesar.zooniverse.org/extractors/shape_extractor?task=T0&shape=point&details=%7B%27T0_toolIndex0_subtask0%27%3A+%27question_extractor%27%2C+%27T0_toolIndex0_subtask1%27%3A+%27dropdown_extractor%27%2C+%27T0_toolIndex1_subtask0%27%3A+%27question_extractor%27%2C+%27T0_toolIndex1_subtask1%27%3A+%27dropdown_extractor%27%7D`

although I expect the decoded URL would also work (not tested)
`https://aggregation-caesar.zooniverse.org/extractors/shape_extractor?task=T0&shape=point&details={'T0_toolIndex0_subtask0':+'question_extractor',+'T0_toolIndex0_subtask1':+'dropdown_extractor',+'T0_toolIndex1_subtask0':+'question_extractor',+'T0_toolIndex1_subtask1':+'dropdown_extractor'}`

These keywords define the task ID, the shape used for the drawing tool, and the extractors to use for each of the subtasks. In this example there are two point tools on task `T0` and they each have a question subtask followed by a dropdown subtask.

Any subtasks not explicitly defined in this `details` keyword are ignored an will not be extracted.

#### Setting up the reducer

The reducer's URL prams also have the `details` section in the same format as the extractor. As an example for the dbscan reducer the keywords would look like (using default cluster params):

``` json
{
    "shape": "point",
    "details": {
        "T0_toolIndex0_subtask0": "question_reducer",
        "T0_toolIndex0_subtask1": "dropdown_reducer",
        "T0_toolIndex1_subtask0": "question_reducer",
        "T0_toolIndex1_subtask1": "dropdown_reducer"
    }
}
```

The encoded URL would be
`https://aggregation-caesar.zooniverse.org/reducers/shape_reducer_dbscan?shape=point&details=%7B%27T0_toolIndex0_subtask0%27%3A+%27question_reducer%27%2C+%27T0_toolIndex0_subtask1%27%3A+%27dropdown_reducer%27%2C+%27T0_toolIndex1_subtask0%27%3A+%27question_reducer%27%2C+%27T0_toolIndex1_subtask1%27%3A+%27dropdown_reducer%27%7D`

or the decoded URL
`https://aggregation-caesar.zooniverse.org/reducers/shape_reducer_dbscan?shape=point&details={'T0_toolIndex0_subtask0':+'question_reducer',+'T0_toolIndex0_subtask1':+'dropdown_reducer',+'T0_toolIndex1_subtask0':+'question_reducer',+'T0_toolIndex1_subtask1':+'dropdown_reducer'}`
