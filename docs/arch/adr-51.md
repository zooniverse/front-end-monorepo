# ADR 51: User Group Stats Page

September 2023

## Context

We will create a user group stats page to provide statistical insights and data visualization of a user group’s Zooniverse activity. The user group stats page will utilize the new Zooniverse stats service - [ERAS](https://github.com/zooniverse/eras) (Enhanced Running Average Stats Service) - in addition to existing [Panoptes](https://github.com/zooniverse/panoptes) resources (notably `users`, `user_groups`, and `projects`).

### Features

The user group stats page will show statistical information based on user group member role and user group `stats_visibility` property.

Statistical information will include a bar chart of classification counts or hours (changeable by period and filterable by project), top projects, and could include top individual contributors and all user group members’ statistics.

User groups with the appropriate `stats_visibility` property will support a CSV export of user group member statistics.

A group admin will create and manage a user group with related modals.

## Decision

Create a user group stats page at `www.zooniverse.org/groups/[group ID]`.

Users will join a user group using a “Join Link” similar to the existing process with [classroom](https://github.com/zooniverse/classroom) and [education-api](https://github.com/zooniverse/education-api).

Create ERAS client.

Create shared stats components (i.e. bar chart) in lib-react-components.

Create export member statistics to CSV functionality for applicable user groups.

## Status

Accepted

## Consequences

Create client, components, and features noted. Create user group stats page in new library `lib-user` per [FEM packages structure discussion](https://github.com/zooniverse/front-end-monorepo/discussions/5089).
