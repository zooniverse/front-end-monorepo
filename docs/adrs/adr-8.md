# ADR 8: Building the TESS Light Curve Viewer

October 15, 2018

## Context

For the upcoming the upcoming TESS project (aka Planet Hunters 2019), we need  to create a special Light Curve Viewer component for showing interactive brightness curves.

Further information available on the [TESS Front End documentation](https://docs.google.com/document/d/1BcX4PyC2khmtC9g035G2e5I1zirZa3z9mWINkWATaPs/edit?usp=sharing).

@rogerhutchings, @shaun.a.noordin and @srallen researched available charting libraries, particularly ones designed for seamless integration with React. Of those, prototypes were built with [Plot.ly](https://plot.ly/javascript/react/), [Victory](https://formidable.com/open-source/victory/) and [vanillaD3](https://d3js.org/). Sample data was taken from the Planet Hunters project.

From these, we discovered that:

1. Both Plot.ly and Victory suffered from slow performance, especially when using their out-of-the-box features (such as the selection tools).
2. Plot.ly and Victory had some API limitations that made fulfilling spec requirements difficult. Plot.ly, for example, had a limited set of events available (`click` events, but not `mousemove`, `drag` etc).
3. The out-of-the-box features were often almost perfect, but not quite, and hard to extend. Plot.ly, for example, has a range select tool, but it's designed for selecting data subsets for plotting. To create annotations, we'd have needed to use the range selections and turn them into a variable width bar chart plotted on top of the scatter plot.

## Decision

We decided that trying to use a library to meet our fairly unusual requirements would end up causing more work than would be saved by having the basic features available. As such, the Light Curve Viewer will be built using native D3, implemented into the classifier's React components.

## Status

Approved by @rogerhutchings, @shaun.a.noordin, and @srallen.

## Consequences

- The next question to solve is _how_ exactly D3 should be implemented in the
  classifier. Both React and D3 essentially want to control the DOM, and we need to determine whether it's better to simply allow it full control, or override React's lifecycle methods (which would allow us to pass in props to the chart, for example).
- We will essentially need to write (and test) more code ourselves.
- There is an interesting possibility - we could use D3 to handle basic image subjects as well. While it might seem overkill on the surface, it would mean we could reuse pan and zoom code, and use its `scale` functions to handle pixel to coordinate transformations.
