# Classifier Store

The classifier store is built upon [mobx-state-tree](https://mobx-state-tree.js.org/). This library combines the functionality of a tree data structure with [mobx](https://mobx.js.org/) functional reactivity using observables. The MST API provides us:

- type checking with model data types
- mutability of state using actions
- snapshotting for caching, time travelling, logging, etc
- observability and reactivity

## Panoptes resources

We mostly work with Panoptes resources, so we have a standardized model to work with them. The `Resource` model defines the baseline model for Panoptes resources defining the resource id as the unique identifier to use in the tree. The `ResourceStore` model defines set of actions that can be used to asynchronously HTTP request and store the result of the request. Every Panoptes resource we request for should be a composition with the `ResourceStore`.

Each resource store has a `resources` property that is a map type. This is to store the response from Panoptes which is always a collection of resources in an array. Some responses because of their database relationship will only have one item in the response array (i.e. one field guide per project), however, we use definition regardless of the database model to have a consistent API.

Each resource store has an `active` reference type which uses the id of the resource to look up the specific resource to use from the `resources` map. The active resource is typically something that is being rendered in the UI or interacted with in some way.

Several resources are setup to observe another resource and reset and/or request from Panoptes a refreshed instance of itself when the observed resource changes. This is typically defined in the `afterAttach` MST lifecycle method. This was done so the classifier itself could be almost entirely stand-alone and be able to load up what it needs to to be able to classify. What this results in is a chain reaction of the following:

1. Classifier component gets a project snapshot set as the prop
2. The project snapshot is applied to the classifier store
3. Resources observing the project, fire off their reaction: fetch their resource and/or reset. This includes field guide and user project preferences.
  - Field guide requests for its linked media resources
4. Workflow id prop is passed to the store and makes a request for the workflow
  - Optionally subject set and subject ids are set by prop and specifically requested for.
5. Resources observing the workflow, fire off their reaction: fetch their resource and/or reset. This includes subjects and tutorial.
  - Tutorial requests for its linked media resources.

Note:  Workflow selection logic must be implemented in whatever app consumes the classifier library. Additionally, it's recommended to remove the user project preferences from the classifier as well and pass in as prop instead the tutorial last seen time stamps and a callback to update the UPP as needed.

The classification store is an exception to the rule being a Panoptes resource, but it is the classifier that first creates it locally and then later POSTs it to Panoptes.

## Other stores

We have several other stores that may follow a similar pattern of using active references and maps, but this is mostly out of convention of what the Panoptes resource stores established. Others may do something else entirely. Feedback, TranscriptionReductions, WorkflowSteps, and the children task types have their own functionality and APIs.