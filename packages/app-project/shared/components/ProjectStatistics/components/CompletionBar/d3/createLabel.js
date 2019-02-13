export default function createBar (selection, fill) {
  return selection
    .append('text')
    .text('0%')
    .attr('x', '0%')
    .attr('y', '50%')
    .attr('alignment-baseline', 'middle')
    .attr('dx', '12px')
    .attr('text-anchor', 'start')
    .attr('fill', fill)
}
