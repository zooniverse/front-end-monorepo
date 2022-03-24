# ADR 42: Record classifier store snapshots in session storage

11 March 2022

## Context

Volunteers on HMS NHS, which uses ordered subject selection, ran into problems where they were shown Already Seen subjects, which then prevents them from classifying further. Unlike a workflow with random selection, refreshing the page for a workflow with ordered selection will always give you back the same subject from Panoptes. A solution to this problem would be to remember their active subject state across page visits eg. going to Talk and returning.

MobX State Tree is built on the concept of [snapshots](https://mobx-state-tree.js.org/concepts/snapshots), which are immutable objects representing the state of the store at a given moment. Snapshots are generated automatically whenever the store changes state, and can be retrieved with `getSnapshot`:

```js
const snapshot = getSnapshot(store)
```

Stores can be created from snapshots:

```js
const store = Store.create(snapshot)
```

or snapshots can be applied to an existing store with `applySnapshot`:

```js
applySnapshot(store, snapshot)
```

In either case, the store state should then match the snapshot.

## Decision

We can use snapshots to preserve volunteers' sessions by saving them to session storage, then creating the store from a stored snapshot when they enter the page eg. `const classifierStore = RootStore.create(snapshot, options)`. This is a big change to classifier behaviour, so I've split it across several PRs, making changes incrementally and verifying each step before proceeding. Internally, the saving and loading of state snapshots are implemented as hooks for the top-level `ClassifierContainer` component.

## Consequences

- the classifier store is written from an assumption that it starts from an empty state. On load, reactions run which reset trees and load in new data from the API. When the classifier store is created from a snapshot, the snapshot is mostly deleted by these data-fetching reactions. When starting the store from an existing state snapshot, data-fetching should be more intelligent:
  - when a tree is empty, request new data from Panoptes.
  - when a tree is already populated, only request fresh data if the stored resources are stale.
- volunteers expect refreshing the page to load a new subject on  most projects. When loading the store from a snapshot, we should be careful to reset the subject queue unless the workflow explicitly uses ordered subjects.
- loading an existing classification and continuing from a snapshot isn't supported at the moment (11 March 2022.) Leaving the classifier and returning will destroy any work in progress.
- classifier state is saved in session storage, so that we can have multiple classifiers open in different tabs, without those pages interfering with each other.
- session storage is behind a flag, `cachePanoptesData`, which can be passed into the classifier in order to enable storage for a project. `cachePanoptesData` is automatically set for any project that uses `workflow.prioritized`.

## Status

Ongoing.
