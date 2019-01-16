export default function setDataPointStyle (selection) {
  return selection
    .attr('class', 'data-point')
    .attr('r', 1.25)
    .attr('fill', '#488')
}
