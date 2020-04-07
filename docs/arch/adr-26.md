# ADR 26: Tracking errors with Sentry releases

7 April 2020

## Context

We use [Sentry](https://sentry.io) to provide centralised JavaScript error logging for the project and content pages apps. Sentry supports versioned releases, and GitHub integration, so that fixes can be linked to releases and new issues can be linked to potentially bad commits.

## Decision

The monorepo will be versioned in Sentry, using the git commit SHA to version a release. New releases are deployed to staging on each push to master. A release is finalised and deployed to production when the production-release tag is updated to point to that release. [#1599](https://github.com/zooniverse/front-end-monorepo/pull/1599) and [#1601](https://github.com/zooniverse/front-end-monorepo/pull/1601) implement this using GitHub actions.

## Status

Proposed

## Consequences

Releases are global to a Sentry organisation. Commit SHAs are unique to the monorepo but we should be mindful that the Zooniverse organisation potentially includes releases for Caesar, Tove etc. Monorepo releases should not conflict with other projects.

Where possible, Sentry events/issues should be linked up to a corresponding GitHub issue for easier tracking and resolution of client-side JS errors.

Bug fixes in an upcoming release should be labelled as 'resolved in next release' in Sentry, after deployment and testing on staging.

