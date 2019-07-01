export default function setDataPointStyle (selection, chartStyle) {
  return selection
    .attr('class', 'data-point')
    .attr('r', chartStyle.dataPointSize)
    .attr('fill', chartStyle.color)
}
