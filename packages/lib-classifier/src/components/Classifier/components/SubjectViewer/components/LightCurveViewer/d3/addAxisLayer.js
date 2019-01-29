/*
Adds the Axis Layer to the chart.

Structure is:
```
<g.axis-layer>
  <g.x-axis>
  <g.y-axis>
  <text.x-axis-label>
  <text.y-axis-label>
```
 */

import addAxisLabel from './addAxisLabel'

export default function addAxis (selection, chartStyle, xAxis, yAxis, axisXLabel, axisYLabel) {
  const axisLayer = selection
    .append('g')
    .attr('class', 'axis-layer')
  
  axisLayer
    .append('g')
    .attr('class', 'x-axis')
    .attr('color', chartStyle.color)
    .call(xAxis)

  axisLayer
    .append('g')
    .attr('class', 'y-axis')
    .attr('color', chartStyle.color)
    .call(yAxis)
  
  axisLayer.call(addAxisLabel, 'x-axis-label', axisXLabel, chartStyle)
  axisLayer.call(addAxisLabel, 'y-axis-label', axisYLabel, chartStyle)

  return axisLayer
}
