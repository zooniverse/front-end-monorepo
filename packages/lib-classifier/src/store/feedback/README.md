# Feedback

Feedback is a feature to either collect data about the success or failure of the volunteer classification compared to a known classification (aka gold standard) and/or display a message to the volunteer depending on the success or failure. Feedback is commonly used in volunteer training workflows, projects that do downstream user weighting, and with the workflow assignment feature. 

Feedback could be leveraged to also just display a message to a volunteer regardless of the success or failure if the success and failure messages are made to be identical for the rule or in subject specific feedback metadata. For example, informing the volunteer that the subject is a sim.

Feedback depends on rules to be setup on the workflow and metadata on the subjects to function as well as a strategy defined for the particular workflow task type and tool type if applicable (drawing, transcription, data visualization annotation tasks).

## Folder Architecture

- `helpers` - helper utility functions.
- `strategies` - the different methods for reconciling subject metadata and the workflow-defined rules for different task and tool types.

Note: lab components are currently part of [Panoptes-Front-End](https://github.com/zooniverse/Panoptes-Front-End/tree/master/app/features/feedback/lab) and in the future will be added to the [lab app](https://github.com/zooniverse/pfe-lab).

## How to set up feedback on a project

**Requires the general feedback experimental option to be enabled.**

[Documentation on experimental tools](https://github.com/zooniverse/how-to-zooniverse/blob/master/ProjectLifecycle/experimental_tools.md). Enable `general feedback` in the admin tools for the project.

### Workflow

1. In the project builder, navigate to your workflow, and find the feedback section in the bottom right.
1. Start creating a new rule by clicking the button.
1. Define a unique id for the rule, check the boxes for whether you want feedback to be shown on success, failure or both. Where enabled, a default message must be defined.
1. Select a strategy for your rule. See the [Strategies](#Strategies) section below for more information.
1. Define any additional options required by the chosen strategy, and save the new rule.

### Subjects

1. Assemble your images, and create a `manifest.csv` file.
1. For each subject where you want a feedback rule enabled, add the following columns:

  - `#feedback_N_id` **(required)** - corresponds to the desired rule ID you created in the workflow.
  - `#feedback_N_successMessage` (optional) - a success message specific to this subject that overrides the default success message set on the workflow.
  - `#feedback_N_failureMessage` (optional) - a failure message specific to this subject that overrides the default failure message set on the workflow.

  `N` must be an integer. This lets you define multiple rules on one subject.

## Strategies

A [strategy](strategies/README.md) is the method for reconciling a user's annotations and the known data defined on the subject. The following strategies are available:

### Drawing Task

- [Column](strategies/drawing/column/README.md)
- [Radial](strategies/drawing/radial/README.md)

### Question Task

- [Single-Answer-Question](strategies/single-answer-question/README.md)

### Data Visualization Annotation (like TESS)

- [Graph2DRange](strategies/datavis/graph2drange/README.md)

### Survey Task

- [Simple](strategies/survey/simple/README.md)
  - Compares only the choice ids

### Other

- [Dud](strategies/dud/README.md)
  - If annotation is empty or not
