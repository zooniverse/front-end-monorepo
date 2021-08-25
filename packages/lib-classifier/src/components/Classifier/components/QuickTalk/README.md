# Quick Talk Component

The Quick Talk component is intended to promote Subject discovery & discussion, by embedding basic Talk functionality into the Classify page.

- As of August 2021, this is an **experimental feature**
- To enable it, add `quicktalk` to a Project's `experimental_tools`
- As part of its experimental nature, it _independently checks the User resource._
  - `app-project` is supposed to handle the User resource, but at the moment, that's not passed down to `lib-classifier`
  - As such, `lib-classifier` components that need the User resource have to (for now) figure out the user on their own accord. QuickTalk's user-checking is self-contained to the component so it'll be easier to isolate and replace once a long-term solution (i.e. have `app-project` pass down the User resource) is available.
  - This causes some minor inefficiencies/duplication of work (i.e. fetching the User resource at both the app-project and lib-classifier levels) but is considered acceptable for an experiment.
  - Please see https://github.com/zooniverse/front-end-monorepo/discussions/2362 for more details.
