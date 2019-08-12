# ADR 17: Staging Deployment

Created: August 6, 2019

## Context

We have identified a gap in our automated and manual testing process from the deployment of [zooniverse/front-end-monorepo#1038](https://github.com/zooniverse/front-end-monorepo/pull/1038). This pull request had been reviewed and tested manually in a development environment on the reviewer's local machine, tests passed, and the app appeared to work as intended with the added bug fix. After automatic deployment to production by merging to master, however, we received a report that Planet Hunters: TESS classification interface was no longer functioning. The classify page was returning a 404.

We had acknowledged previously that we had a need for staging environment deploys for the purposes of design reviews in [zooniverse/front-end-monorepo#694](https://github.com/zooniverse/front-end-monorepo/issues/694). We now have a need to have staging deployments so we can manually check that the pull request functions in a deployed, production-like environment. The next.js builds and creates files specific for the production deployment that running the app locally for development does not replicate, nor is it replicated in automated unit testing.

Initially we were considering branch deploys for both of these cases, but in order to do this we would need to use wildcard sub-domains. At this time, [kubernetes ingress does not support wildcards](https://github.com/containous/traefik/issues/3884). Therefore, we need to devise a different solution.

## Decision

In practice, we're going to have two kinds of pull request: one that changes a single app (e.g. new widget on project home page), and one that affects multiple apps (e.g. update to the shared component library). For PRs on a single app, we'd like to manually deploy it as a staging branch deployment so it can be tested in isolation. On merging to master, that gets deployed to staging automatically. We'd then do manual integration testing before manually deploying to production. For PRs across multiple apps, we'd test it locally before merging to master using a local Docker image setup to use Panoptes in production. Once it's deployed to staging, we'd do integration testing before manually deploying to production.

We're going to setup a staging deployment that matches production as closely as possible to fill the gap of the need for manual reviews to confirm that the app is functioning. To accomplish this:

- Merging to master will be switched to deploy to staging to https://frontend.preview.zooniverse.org
- Production deployment will now be done manually triggered by lita command on slack and using a git tag for production
- The Jenkins file will be updated to use the git tags to determine the location of the deployment
- Cloudfront will be configured to load the correct microservice app depending on route:
    - Both the staging (https://frontend.preview.zooniverse.org) and production domains (www.zooniverse.org) will have cloudfront configurations that will match URL traffic against rules setup in Cloudfront.
    - The cloudfront rules match paths on the incoming URL, i.e. `/about/team` maps to a registered service via DNS, e.g.
        + When a `GET` request for URL `www.zooniverse.org/about/team` hits cloudfront, it maps to the `fe-content-pages.zooniverse.org` service domain. 
        + Cloudfront then proxies that request via DNS lookup to the Kubneretes (K8) ingress service
        + The K8 ingress then looks up the registered service domain and forwards the request, in this case, to a `fe-content-pages` service pod to serve the request and respond to the client. 
    - Generally staging and production would have the same behaviour mappings in Cloudfront and staging will be a place to test these mapping out before setting up in production.

A future enhancement will be added for branch deploys for manual reviews. This can possibly be accomplished by:

- Lita command on slack
- Script is written to deploy to a branch
- Helm could be used to tear down the pods after the branch is merged

## Status

Accepted

## Consequences

- The deployment of the front-end next.js apps will match how the back-end apps are managed so we will now be consistent in process
- We will need to train developers on the new deployment process
- We do not have a clear set of steps for setting up the as needed branch deployments at this time
  - We need to do more research into technically how to accomplish the ad hoc branch deployments and tear downs. It is not known if Helm can be used for this.
