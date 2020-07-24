# ADR 28: Data as a subject viewers

July 24, 2020

## Context

One of the goals for the CSSI grant is to be able to represent JSON data as subjects for classification in the classifier. We initially accomplished this separately for the Planet Hunters: TESS project by building a d3.js subject viewer for its specific use case (see: [ADR 8](adr-08.md)). We would like to expand this concept to be more generalizable and modular to be able to be used by other research projects that have JSON data to classify. 

## Decision

### Changes from the TESS LCV

The TESS LCV is built only for their use case and is not configurable. It is hard coded to expect brush stroke annotation for the classifications, zoom only in the x-axis direction, and for only one data series. We will build a generally configurable plots so that other projects can have the flexibility they need. The new plot viewers will be modular so that it can be placed into a composite, complex subject viewer as needed. 

Previously, the TESS LCV was built using d3.js, however, mixing d3 and react can be dangerous. The decision at the time was to use d3 because of the custom requirements needed for the TESS LCV and the react + d3 libraries were too opinionated to be used for our needs. The library d3 is also difficult to write tests for because of its chaining API. For this reason, the original TESS LCV is largely untested.

Since then, a library called [vx](https://vx-demo.now.sh/) containing reusable low-level visualization react component that uses the d3 math utilities, has become more mature to start using. This fits our needs to have the DOM solely rendered by React, but still has the usefulness of a mature library like d3 to do calculations as needed. The new plots will be built using vx.

The long term goal is to swap the TESS LCV over to the new `ScatterPlotViewer`, however, this means adding support for brush annotations which will be investigated at a later time.

### ScatterPlotViewer

The scatter plot will be built with support to configure:

- Multiple data series
- Customizable data series colors to represent information as needed
- Pan and zoom in both axes directions or constrainable
- Axis inversion
- Customizable axis label
- Customizable number of axis ticks and direction
- Customizable margin and padding for the plot area

### BarChartViewer

A bar chart plot will be built with support to configure:

- Multiple data series
- Customizable data series colors to represent information as needed
- Labels for axes and for individual bars

### VariableStarViewer

The scatter plot and the bar chart together along with the `SingleImageViewer` and a few additional controls will be a complex composite viewer built as the `VariableStarViewer`. The `VariableStarViewer` will have its own control bar that has a toggle for axis inversion, period, data series visibility, and phase focus. Each scatter plot will be individually pan and zoomable.

### DataImageViewer

_Note: Naming still TBD_

This will be a complex composite consisting of a scatter plot and a single image. We may want to support up to N images, but this is still TBD. The initial build will be just the single scatter plot and single image.

### Future plots

There may be requests to build more plot types like a line plot or map plot that renders GeoJSON. We will continue to evaluate our usage of vx at that time and ideally will continue to use it.

## Status

Approved

## Consequences

- There's risk using vx as it hasn't had a major version release yet and risk inherantly of using third party libraries if support for it dries up. It's possible there will be a request in the future for customization that we can't do well in vx and we'll have to look into alternatives.
- We will we be able to write less code than using d3 directly and be able to continue to support customization as needed.
- Writing tests is much easier using React components for the visual components and d3 just for utility functions for calculation.
- We have multiple methods of doing pan and zoom in our code now and we should follow up on consolidating these methods. The vx library uses a transformation matrix which is something we may want to adopt more generally. 