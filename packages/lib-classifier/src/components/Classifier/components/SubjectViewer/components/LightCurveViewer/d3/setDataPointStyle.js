export default function setDataPointStyle (selection) {
  return selection
    .attr('class', 'data-point')
    .attr('r', 1.5)
    .attr('fill', '#fff')
}
