/*
Returns the x-y coordinates of a mouse click.
The coordinates are relative to the origin of the specified SVG node (which
uses D3 scales for its x and y axes).
 */

import * as d3 from 'd3'

export default function getClickCoords (svgNode, xScale, yScale, transform) {
  const coords = d3.mouse(svgNode)
  return [
    transform.rescaleX(xScale).invert(coords[0]),
    yScale.invert(coords[1]) // For the LightCurveViewer, only the x-axis is rescaled
  ]
}
