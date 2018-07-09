# ADR 2: Considering options to migrate from Next.js to another server-side rendering (SSR) framework

July 3, 2018

## Context

At the Zooniverse Team Meeting April 2018, it was decided that Panoptes Front End would be broken up into modular libraries and client-side apps. To aid in this rewrite, it was also decided that we would try out server-side rendering (SSR) since now there are several frameworks for React that make this easy. SSR has several benefits including improved load times and rendered HTML that search providers could crawl to index.

It was initially chosen to use a SSR framework called Next.js. Next.js is an opinionated framework that supports out of the box SSR, routing, production build compiling. In particular its API provides a method, `getInitialProps` to easily hydrate client-side app state. However, in the brief experience we have had so far, Next.js has been:

  - difficult to configure it. We had to configure it to use Grommet 2 and styled-components as these are not defaults.
  - difficult major version upgrades. Version 6 was release right when we started and the upgrade path took a lot of time.
  - Had issues with Mocha.js. This is concerning since Mocha.js is the most popular test framework for javascript.

There is an [open issue](https://github.com/zeit/next.js/issues/1632) confirming that Next.js will be integrating React Router v4 as its routing solution. React Router v4 is not a router that we wish to use due to its significant API changes.

In addition, Sarah had been recently advised by fellow developers in the Chicago Javascript community that Next.js is difficult to configure which can outweigh any benefits it might provide. 

## Decision

Sarah will build a prototype app with [React-Server](https://react-server.io/docs) and Roger will build one with [Razzle](https://github.com/jaredpalmer/razzle). Both have been identified as having active maintenance communities. React-Server uses middleware for configuration and comes with a preset of middleware for routing, request agent, and rendering. Razzle is only concerned with SSR and leaves the javascript framework, routing, and other features left to the developer making it compatibile with frameworks like Angular, Vue, etc.

## Status

Accepted

## Consequences

There is an initial skeleton for the app-project built with Next.js. We need to evaluate React-Server and Razzle to see if it can meet these requirements for migrating app-project to a new SSR framework:

  - Does it have a way to hydrate the client side app like Next.js's `getInitialProps`?
  - Will Grommet 2 and style-components work? How difficult is it to configure?
  - Can it do the initial API request server-side?
  - Is there an option to only do client side rendering for specific components? In this case, for the classifier. 
  - What is the process for building for production? How difficult is it to do production deployment?
