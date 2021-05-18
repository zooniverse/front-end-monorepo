# ADR 31: RotatingRectangle Tool and TemporalRotatingRectangle Tool

## Status

In Review

## Context

The Solar Jets project requires a TemporalRotatingRectangle drawing tool for volunteers to capture the width, height, angle and time properties of a solar jet. At the time of this writing, the `front-end-monorepo` has a standard Rectangle drawing tool which gives the width and height properties. Based on the standard Rectangle drawing tool, we want to create a RotatingRectangle drawing tool and a TemporalRotatingRectangle drawing tool.

The RotatingRectangle drawing tool is a common tool used in the `Panoptes-Front-End` code base and eventually needs to be written in the `front-end-monorepo`. This is a good opportunity to complete this task.

The idea is to create two new rectangle drawing tools based off the standard Rectangle drawing tool. Once complete, the `front-end-monorepo` will have the following rectangle drawing tools:

**Rectangle**

```json
{
  "details": array,
  "frame": number,
  "height": number,
  "toolIndex": number,
  "toolType": string,
  "width": number,
  "x_center": number,
  "Y_center": number
}
```

**RotatingRectangle**

\*everything the `Rectangle` tool has plus this addition:

```json
{
  "angle": number
}
```

**NOTE:** angle is Degrees (-180, 180)

- positive angles rotate from +x to +y (a right-handed coordinate system)
- rotation is about the center of the rectangle

**TemporalRotatingRectangle**

\*everything the `RotatingRectangle` tool has plus this addition:

```json
{
  "displayTime": string
}
```

**NOTE:** displayTime will be formatted as:

- If minutes exist: mm:ss:ms
- If minutes do not exist: ss:ms

ms (milli-seconds will be to 3 decimal places)

**Temporal Tools**
A temporal tool will include a time property. This time property refers to the point in time on a video file when the drawing tool is created.

For example:
If a video is 4 seconds long. A user plays the video for 2.0 seconds and draws a rectangle, the rectangle will have a displayTime equal to 2:000. The rectangle will only display from the 2:000 timestamp to the end of the video.

The Solar Jets project will have mp4 video files as subjects in the new classifier in the `front-end monorepo` (FEM). Using a Temporal drawing tool will allow volunteers to identify the location and time of an action within the videos.

## Decision

We will develop a `RotatingRectangle` and `TemporalRotatingRectangle` in the FEM.

The first step will be to extend the `Rectangle` to create a new `RotatingRectangle` adding only the functionality to allow the rectangle to rotate which will add the `angle` property to the model.

Lastly, we will extend the `RotatingRectangle` to create a new `TemporalRotatingRectangle` adding the `displayTime` property to the model.

An example of this tool extension can be seen in this PR: [PR#2099](https://github.com/zooniverse/front-end-monorepo/pull/2099)

## Consequences

Theses decisions allow for these improvements:

- Separation of concerns. Each tool will be its own component making debugging and testing easier.
- For down-stream aggregation this method is clean as rotating shapes are handled differently than non-rotating ones (the difference stems from how the "distance" between two angles is different than the "distance" between two points because angles wrap back around at 360 deg).
  Also, the auto-configuration step for aggregation only works with the workflow data, and that is the step that needs to pick between the non-rotating extractor and the rotating extractor (as it is currently written), so having them be different tool types would require less reworking of how aggregation works with the data.

Potential negative impact:

- May cause configuration issues in a new project builder design

Questions to consider:

Do we support both standard drawing tools and temporary drawing tools for multi-frame subjects that have both video and images? Would this introduce complexity to the project builder UI, classification UI, as well as downstream aggregation?

How do we distinguish visually between the temporal tools and standard tools? Should we have a separate icon set or another indicator of some sort in the project builder and classifier task area that a temporal version of the tool is loaded?

Will we eventually support temporal versions of all our drawing tools?
