# ADR 3: Browser support

July 18, 2018

## Context

Fairly early on in the rebuild of the Classifier, we started using newer technologies such as [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), which are not supported in older browsers like Internet Explorer 11.

And, while Edge is now several major versions in, we still have a percentage of users on IE11. As such, we're now at a point where we have to determine whether to drop support for legacy browsers and risk inconvenience for that segment, or invest significant time in coding and testing fallbacks.

## Decision

We will only officially support the following browsers:

### Desktop

- Safari
- Chrome
- Firefox
- Edge

### Mobile

- Safari
- Chrome
- Opera

Of these, we will support the current and last two major versions.

## Status

Proposed

## Consequences

- Developers will be able to use modern browser technologies and spend more time on writing features.
- Support for legacy browsers will be curtailed, so we will need to communicate what browsers are supported to our users well in advance of code going live.
- If we are required to carry on supporting IE11 until its end-of-life in 2023, we will need more developer time both for the rewrite and ongoing maintenance to perform manual testing.
