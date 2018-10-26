# ADR 4: Browser support

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

Approved

This was discussed with @trouille and @chrislintott prior to approval.

## Consequences

- Developers will be able to use modern browser technologies and spend more time on writing features.
- Support for legacy browsers will be curtailed, so we will need to communicate what browsers are supported to our users well in advance of code going live.
- There will likely be a period of overlap between the old and new classifiers. This will allow us to let older projects complete or go dormant, and force new projects to be built for the new classifier, so volunteers on existing projects won't get shut out.
