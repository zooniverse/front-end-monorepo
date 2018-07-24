# ADR 2: Considering options to migrate from Next.js to another server-side rendering (SSR) framework

July 24, 2018

## Context

At the Zooniverse Team Meeting April 2018, it was decided that Panoptes Front End would be broken up into modular libraries and client-side apps. To aid in this rewrite, it was also decided that we would try out server-side rendering (SSR) since now there are several frameworks for React that make this easy. SSR has several benefits including improved load times and rendered HTML that search providers could crawl to index.

It was initially chosen to use a SSR framework called [Next.js](https://github.com/zeit/next.js/). Next.js is an opinionated framework that supports out of the box SSR, routing, production build compiling. In particular its API provides a method, `getInitialProps` to easily hydrate client-side app state. However, in the brief experience we have had so far:

  - It's been difficult to configure. We had to configure it to use [Grommet 2](https://v2.grommet.io/) and [styled-components](https://www.styled-components.com/) as these are not defaults.
  - It's been difficult with major version upgrades. Version 6 was released right when we started and the upgrade path took a lot of time.
  - It's had issues with [Mocha](https://mochajs.org/). This is concerning since Mocha is the most popular test framework for javascript, and our current default.

There is an [open issue](https://github.com/zeit/next.js/issues/1632) confirming that Next.js will be integrating React Router v4 as its routing solution. React Router v4 is not a router that we wish to use due to its significant API changes.

In addition, Sarah had been recently advised by fellow developers in the Chicago Javascript community that Next.js is difficult to configure which can outweigh any benefits it might provide. 

Roger and Sarah built several prototypes with other libraries, including [react-server](https://react-server.io/), [razzle](https://github.com/jaredpalmer/razzle), and [react-universally](https://github.com/ctrlplusb/react-universally). However, none of these provided the same ease-of-use as Next.js.

## Decision

For the time being, we will continue to use NextJS. We're currently using v5; v6 is available, and likely to be the last version that is router-agnostic, so we can revisit this decision then.

## Status

Accepted

## Consequences

- We will need to solve some lingering configuration issues with NextJS v6 and e.g. Mocha.
- We should investigate this again in the future when we have the capacity to do so, and following the release of NextJS v7, which may still allow for alternative routing solutions.
- Possible future alternatives are [Razzle](https://github.com/jaredpalmer/razzle), and Airbnb's [Hypernova](https://github.com/airbnb/hypernova).
