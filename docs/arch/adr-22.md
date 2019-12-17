# ADR 22: Drawing tools

## Context

With new drawing tools being developed for the classifier, we need an API that's common to all drawing tools and marks, which can be easily extended by tool developers. This document lays out an overview of the drawing tool model and the public interfaces common to all tools and all marks.

## The drawing model

A drawing task has drawing tools. Each tool creates marks. On task completion, a drawing annotation is created, which is an array of all drawn marks. Each mark has a corresponding React component which renders the SVG for that particular shape.

## Filesystem

Drawing tools are stored in `lib-classifier/src/plugins/drawingTools`, in three directories:
- _components_: React components that render marks (one for each Mark model) and any helper functions and components.
- _models_: MobX State Tree models for drawing tools and marks.
- _experimental_: Experimental drawing tools, itself subdivided into components and models.

## The drawing API

The drawing API is described in detail in the [drawing tools README](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-classifier/src/plugins/drawingTools/README.md).

