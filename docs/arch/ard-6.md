# ADR 6: Building the TESS Light Curve Viewer

October 15, 2018

## Context

For the upcoming the upcoming TESS project (aka Planet Hunters 2019), we need
to create a special Light Curve Viwer component for showing brightness curves.

We've explored a number of libraries, most recently Plot.ly and Victory,
and discovered limitations to the libraries that make out-of-the-box 
implementations too cumbersome to consider.

Further information available on the [TESS Front End documentation](https://docs.google.com/document/d/1BcX4PyC2khmtC9g035G2e5I1zirZa3z9mWINkWATaPs/edit?usp=sharing).
(Access restricted to Zooniverse accounts.)

## Decision

The Light Curve Viewer will be built using native D3, implemented into the
monorepo's React components.

## Status

Approved

This was discussed between @rogerhutchings, @shaun.a.noordin, and @srallen.

## Consequences

- The next question to solve is _how_ exactly D3 should be implemented in the
  monorepo code, especially considering how D3's DOM maniplation might interact
  with the React lifecycle.
