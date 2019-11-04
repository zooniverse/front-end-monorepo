# ADR 19: Pages Filmstrip Viewer

November 4, 2019

## Context

As part of the lib-classifier, we are developing a Pages Filmstrip Viewer. This will be the first of several different styles of filmstrip viewers. Please see the [InVision document for the Pages Viewer](https://projects.invisionapp.com/d/main?origin=v7?origin=v7#/console/12924056/373472137/preview) and Issue #1142.

1. *How will researchers select the Pages Viewer in the Project Builder?* 
    In PFE, the research team selects the viewing option for multi-image subjects in the workflow editor. For the future viewers, including the Pages Viewer, how do we want to store the filmstrip viewer preferences on a workflow configuration? This could be as simple as providing a checkbox for _Pages_ view under MULTI-IMAGE OPTIONS in the workflow editor.

2. *How will the application handle subjects with a high mount of frames?* 
    How many frames do we recommend for a multi-frame subject? If there is a recommended limit, how will the application control for this limit? For example, if a project uploads a long ledger as a subject, this could become a performance issue not only in terms of browser resources, but also possibly in terms of distributing volunteer effort across all of the frames.

3. *How will the application generate thumbnails for the filmstrip viewer?* 
    I think we can use the ThumbnailImage.js component in the Pages Filmstrip Viewer. Are there any performance implications for using thumbnails.zooniverse.org (https://github.com/zooniverse/thumbnailer) for this purpose? 

## Decision

## Status
Proposed

## Consequences
