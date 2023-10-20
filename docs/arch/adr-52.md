# ADR 52: User Stats Page

September 2023

## Context

We will create a user stats page to show a user statistical insights and data visualization of their Zooniverse activity. The user group stats page will utilize the new Zooniverse stats service - [ERAS](https://github.com/zooniverse/eras) (Enhanced Running Average Stats Service) - in addition to existing [Panoptes](https://github.com/zooniverse/panoptes) resources (notably `users` and `projects`).

### Features

The user stats page will include the functionality to generate a Volunteer Certificate detailing Zooniverse participation hours.

Statistical information will include a bar chart of classification counts or hours - changeable by period and filterable by project.

## Decision

Create a user stats page at `www.zooniverse.org/users/[user login]/stats`.

Create ERAS client.

Create shared stats components (i.e. bar chart) in lib-react-components.

Create PDF generation feature to document user contributions.

## Status

Accepted

## Consequences

Create client, components, and features noted. Create user stats page in new library `lib-user` per [FEM packages structure discussion](https://github.com/zooniverse/front-end-monorepo/discussions/5089).
