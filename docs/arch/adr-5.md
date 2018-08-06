# ADR 5: Implementing workflows in the new classifier

July 25, 2018

## Context

The current classifier was based on a few assumptions, that, while accurate at the time, became outdated as additional functionality was added:

1. That a workflow step consisted of a single annotation action. However, project builders wanted to e.g. annotate via drawing _and_ selecting from a list of options in a single step, which gave rise to the combo task.
1. That we would always want to show a summary. When the `hide classification summaries` tool became public, more projects actually wanted to use it than we expected.
1. That we wouldn't need to show any information to a volunteer until the end. That changed firstly with the MS interventions experiment, and later feedback, which is shown once a workflow task is completed.

## Decision

We implement the classification process like this:

The classification of a subject will consist of a series of __steps__. A single step consists of a __task hook__, and a __notification hook__. A task hook consists of an __array of one or more workflow tasks__. A notification could be an __intervention__, __feedback__, a __Sugar notification__, or some other information conveyed to the volunteer.

In practice, this will probably mean that the current workflow store is only used to store the resources from the Panoptes API. Once the project and workflow are loaded, we will derive a store for the workflow steps and that will drive the user interface.

## Status

Proposed

## Consequences

- This is a fundamental change to the way we structure the classifier, and devs will need to be educated on the changes.
- We will need to be able to describe tasks and notifications in a serializable format, such as a plain unique name string, as this is a requirement of [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree#tree-semantics-in-detail).
- The Project Builder will need some way of allowing workflow tasks to be grouped similarly to the existing combo task, and that will be parseable as a workflow step.
- We may need to assume that an array of tasks occurs consecutively in a single workflow step, e.g. `step.task[0]` is a drawing task which triggers `step.task[1]`, a question task, which then triggers `step.task[2]`, a second drawing task.
