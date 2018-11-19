//TODO: generalise

import * as d3 from 'd3'

 export default function getXFromEvent (context, xScale) {
  const coords = d3.mouse(context)
  return Math.round(xScale.invert(coords[0]))
}