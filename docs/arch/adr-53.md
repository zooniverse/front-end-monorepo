# ADR 53: Logged-In User Homepage

September 2023

## Context

We will redesign the logged-in user homepage to provide a user with recent participation statistics, recent projects, recent classifications, and a list of linked user groups (if applicable). The logged-in user homepage will utilize the new Zooniverse stats service - [ERAS](https://github.com/zooniverse/eras) (Enhanced Running Average Stats Service) - in addition to existing [Panoptes](https://github.com/zooniverse/panoptes) and [Talk](https://github.com/zooniverse/talk-api) resources (notably `users`, `projects`, and `comments`).

### Features

The logged-in user homepage will include stats on recent classifications, hours, projects, and comments.

The logged-in user homepage will list recent projects, classifications, and user groups.

## Decision

Create ERAS client.

Create shared stats components in lib-react-components.

Refactor profile ribbon from Panoptes `project_preferences` request(s) to ERAS user stats request.

Refactor recent classifications cards for redesigned logged-in user homepage.

## Status

Accepted

## Consequences

Create client, components, and features noted. Create logged-in user homepage in `app-root` per [FEM packages structure discussion](https://github.com/zooniverse/front-end-monorepo/discussions/5089).
