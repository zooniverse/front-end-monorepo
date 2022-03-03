# ADR 5: Implementing workflows in the new classifier

Created: July 25, 2018
Updated: September 11, 2018

## Context

The current classifier was based on a few assumptions, that, while accurate at the time, became outdated as additional functionality was added:

1. That a workflow step consisted of a single annotation action. However, project builders wanted to e.g. annotate via drawing _and_ selecting from a list of options in a single step, which gave rise to the combo task.
1. That we would always want to show a summary. When the `hide classification summaries` tool became public, more projects actually wanted to use it than we expected.
1. That we wouldn't need to show any information to a volunteer until the end. That changed firstly with the MS interventions experiment, and later feedback, which is shown once a workflow task is completed.

The combo task and drawing sub-tasks specifically create issues since the tasks array becomes a list of both tasks and references to tasks, and it's up to the code to suss out which tasks should be in the combo and take them out of the normal workflow sequence, which requires a disproportionate amount of code for what amounts to an edge case in terms of project building.

An example combo task with one of them as a drawing task with defined sub-tasks.

``` javascript
{
  "id": "3264",
  "display_name": "Combo task test",
  "tasks": {
    "T0": {
      "help": "task 1",
      "type": "drawing",
      "tools": [
        {
          "type": "point",
          "color": "#00ff00",
          "label": "Tool name",
          "details": [
            
          ]
        }
      ],
      "instruction": "Task 1"
    },
    "T1": {
      "type": "combo",
      "tasks": [
        "T0",
        "T2"
      ]
    },
    "T2": {
      "help": "task 2",
      "type": "drawing",
      "tools": [
        {
          "type": "point",
          "color": "#ff0000",
          "label": "Tool name",
          "details": [
            {
              "help": "",
              "type": "single",
              "answers": [
                {
                  "label": "Foo"
                },
                {
                  "label": "Bar"
                }
              ],
              "question": "What is it?",
              "required": "true"
            }
          ]
        }
      ],
      "instruction": "Task 2"
    }
  },
  "first_task": "T1",
  "prioritized": false,
  "grouped": false,
  "pairwise": false,
  "configuration": { }
}
```

## Decision

We implement the classification process like this:

The classification of a subject will consist of a series of __steps__. A single step consists of a __task hook__, and a __notification hook__. A task hook consists of an __array of one or more workflow tasks__. A notification could be an __intervention__, __feedback__, a __Sugar notification__, or some other information conveyed to the volunteer.

In practice, this will probably mean that the current workflow store is only used to store the resources from the Panoptes API. Once the project and workflow are loaded, we will derive a store for the workflow steps and that will drive the user interface.

The workflow resource will need updating to support the new step structure (as discussed in [zooniverse/front-end-monorepo#123](https://github.com/zooniverse/front-end-monorepo/issues/123)):

- `workflow.steps` will be an [ES6 Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) which can be stored as a [Mobx Observable Map](https://mobx.js.org/refguide/map.html)
  - Almost all features of ES6 Maps are supported by all major browsers that we will support.
  - Each value for the key-value pairs will be an object with `taskKeys` that are set to an array of task keys, and optionally a `next` property for a step key.
  - The optionally defined next step is to support recursive workflows. The order is otherwise assumed to be the order of the steps Map:
    > The keys in Map are ordered while keys added to object are not. Thus, when iterating over it, a Map object returns keys in order of insertion.
  - Since the order can be reliably derived from the steps Map, then we can drop `workflow.first_task` from use
- `workflow.tasks` will remain as is for backwards compatibility
- Single question task branching will still use `next` properties in the answer object, but will be set to a step key instead of task key. 
- A step taskKeys property set to `['summary']` will load an optional summary step for the end of the classification, which shifts us to having summaries be opt-in rather than opt-out. If this is not present, then a summary will not display.

An example of what this could look like:

``` javascript
{
  id: '1',
  tasks: {
    T1: {
      answers: [
        { label: 'yes', next: 'S4' }, // Branching single question task
        { label: 'no', next: 'S2' }
      ],
      type: 'single'
    },
    T2: {...},
    T3: {...},
    T4: {...}
  },
  steps: [
    ['S1', { taskKeys: ['T1'] }]
    ['S2', { taskKeys: ['T2', 'T3'] }],
    ['S3', { taskKeys: ['T4'], next: 'S1' }] // Recursion back to Step 1
    ['S4', { taskKeys: ['summary'] }]
  ]
}

```

## Status

Accepted

## Consequences

- This is a fundamental change to the way we structure the classifier, and devs will need to be educated on the changes.
- We will need to request an update to add `steps` as a property to the workflows resource.
- JSON does not directly support ES Maps, so storing them in the database will involve one of two options:
  - *We will first try using this option.* Use a javascript helper library that has full support for map to [serialize](https://github.com/sonnyp/JSON8/tree/master/packages/json8#ooserialize) it as an object (maps are a sub-class of objects) and JSON [parse](https://github.com/sonnyp/JSON8/tree/master/packages/json8#ooparse) back to a map. This would probably be preferred since it would make sure our serialization and parsing is consistent and the keys we are using are strings, so it would be a straight forward conversion to a standard object. 
  - Manage the type conversion ourselves. We'd have to choose storing as an array, object, or stringifying. Examples on how to do this: http://2ality.com/2015/08/es6-map-json.html or http://exploringjs.com/es6/ch_maps-sets.html#_arbitrary-maps-as-json-via-arrays-of-pairs.
- Since the tasks object is not being changed, we should have backwards compatibility with classifier exports and aggregation, but this needs confirmation before implementation.
- We will need to be able to describe steps, tasks and notifications in a serializable format, such as a plain unique name string, as this is a requirement of [mobx-state-tree](https://mobx-state-tree.js.org/concepts/trees#tree-semantics-in-detail). Steps, tasks, and notifications can be converted to ES6 Maps as needed programmatically to provide a serializable key for Mobx-state-tree to use.
- The Project Builder will need a UI update to be able to group tasks into steps. This will need some design time. An early idea is to use a kanban style representation of steps in the new workflow editor. 
