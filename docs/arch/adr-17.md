# ADR 16: Monorepo Tooling

Created: August 6, 2019

## Context

We have identified a gap in our automated and manual testing process from the deployment of [zooniverse/front-end-monorepo#1038](https://github.com/zooniverse/front-end-monorepo/pull/1038). This pull request had been reviewed and tested manually in a development environment on the reviewer's local machine, tests passed, and the app appeared to work as intended with the added bug fix. After automatic deployment to production by merging to master, however, we received a report that Planet Hunters: TESS classification interface was no longer functioning. The classify page was returning a 404.

We had acknowledged previously that we had a need for staging environment deploys for the purposes of design reviews in [zooniverse/front-end-monorepo#694](https://github.com/zooniverse/front-end-monorepo/issues/694). We now have a need to have staging deployments so we can manually check that the pull request functions in a deployed, production-like environment. The next.js builds and creates files specific for the production deployment that running the app locally for development does not replicate, nor is it replicated in automated unit testing.

Initially we were considering branch deploys for both of these cases, but in order to do this we would need to use wildcard sub-domains. At this time, [kubernetes ingress does not support wildcards](https://github.com/containous/traefik/issues/3884).

## Decision

We're going to setup a staging deployment that matches production as closely as possible to fill the gap of the need for manual reviews to confirm that the app is functioning. To accomplish this:

- Merging to master will be switched to deploy to staging to https://fe-project.preview.zooniverse.org
- Production deployment will now be done manually triggered by lita command on slack and using a git tag for production
- The Jenkins file will be updated to use the git tags to determine the location of the deployment

A future enhancement will be added for branch deploys for manual design reviews. This can possibly be accomplished by:

- Lita command on slack
- Script is written to deploy to a branch
- Helm could be used to tear down the pods after the branch is merged

## Status

Accepted

## Consequences

- The deployment of the front-end next.js apps will match how the back-end apps are managed so we will now be consistent in process
- We will need to train developers on the new deployment process
- We do not have a clear set of steps for setting up the as needed branch deployments at this time
  - We need to do more research into technically how to accomplish the ad hoc branch deploymenets and tear downs. It is not known if Helm can be used for this.
