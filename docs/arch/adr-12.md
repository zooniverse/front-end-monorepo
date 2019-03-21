# ADR 12: Production Docker setup

Created: March 21, 2019

## Context

As of writing, Zooniverse apps are being moved from Docker Swarm to Kubernetes, but both require a working Docker image of the app for deployment. However, building separate images from start to finish duplicates a lot of effort in downloading packages, building libraries etc.

## Decision

The [Jenkinsfile](../../Jenkinsfile) builds Docker images in two stages:

1. Build an image containing the entire monorepo at the current commit, then install top- and package-level dependencies, and finally build production versions of the library packages. This image is [zooniverse/front-end-monorepo](https://cloud.docker.com/u/zooniverse/repository/docker/zooniverse/front-end-monorepo).

1. Loop through all folders in the `packages` folder starting with `app-`, and build a Docker image for each one. These Docker images use the `zooniverse/front-end-monorepo` image as a base, and then run the production build and start scripts for that app. An example image is [zooniverse/fe-project](https://cloud.docker.com/u/zooniverse/repository/docker/zooniverse/fe-project).

## Status

Proposed

## Consequences

- We have multiple Docker images used in building a single app for production, which caused some confusion at the beginning as it wasn't documented :facepalm:

- The `Jenkinsfile` rebuilds _everything_ on a push to master. We could be cleverer at what we choose to build: if there's only a change to one of the apps, we only need to rebuild that app image, not the base / other app images, for example.

- We don't need to do a full install of dependencies for each app, as they're built from the same base image; when combined with package hoisting, we can be certain that we're using the same set of dependencies for everything, and can save some time by not having to re-download the same packages multiple times.
