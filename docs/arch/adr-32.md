# ADR 32: Subject Viewer Layouts (aka subject viewer sizing/fitting behaviour)

3 June 2021

## Context

Currently, the FEM Classifier's default "Subject Viewer sizing/fitting" behaviour is _"fit to width, no max height"._

This is analogous to PFE's special "no-max-height" behaviour, which had to be _explicitly set._

While the default "fit to width, no max height" behaviour is good in many cases, there can be issues for certain workflows, e.g. when the Subject is a tall image (such as a portrait photo) and the user's window is very wide, causing the bottom half of the image to be "cut off".

We need to consider how to size/fit viewers for a variety of Subjects and Subject Viewers.

## Decision

The answer is to use **Layouts**.

- The plan for FEM is that every workflow should be able to _set their own Layout_ (e.g. portrait, landscape, fullscreen, etc) each with their own Subject Viewer sizing/fitting behaviour.
- The choice of Layout (presumably per workflow) should be controllable by the project owner.
- Whether or not a specific subject viewer size configuration is supported will depend on the Layout.

See also:
- The current [Layout code](../../packages/lib-classifier/src/components/Classifier/components/Layout), as of June 2021, currently only has DefaultLayout.

## Consequences

- As of June 2021, the designs & plans for creating Layouts exist, but we don't have dev resources to focus on such an enhancement.
- While we wait to get dev time on that, each "special" Subject Viewer (e.g. SubjectGroup, DataViz) should handle Subject Viewer sizing/fitting in whatever manner that suits them, in their own component code.

Notes:
- Please also note that in addition to layouts, certain specialised Subject Viewers can have their visible characteristics (e.g. margin, padding, number of columns/rows/etc) _further customised_ via configuration data found in either the workflow configuration or even in the Subject data itself. 
  - Example 1: the [ScatterPlotViewer](https://github.com/zooniverse/front-end-monorepo/blob/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/components/ScatterPlotViewer/README.md) allows us to set the visible margin and padding _per Subject._
  - Example 2: the [SubjectGroupViewer](https://github.com/zooniverse/front-end-monorepo/blob/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/components/SubjectGroupViewer/README.md) allows us to set the number of rows/columns and size of cells via a JSON object at `workflow.configuration.subject_viewer_config`.
- Please see [ADR 27](./adr-27.md) for further information on Subject Viewer Configuration.

## Status

Accepted
