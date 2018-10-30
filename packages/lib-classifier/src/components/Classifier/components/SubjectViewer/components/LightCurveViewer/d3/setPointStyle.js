export default function setPointStyle (selection) {
  return selection
    .attr('r', 1)
    .attr('class', 'data-point')
    .attr('fill', '#3cc')
}
