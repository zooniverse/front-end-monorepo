export default function createBar (selection, fill) {
  return selection
    .append('rect')
    .attr('width', '0%')
    .attr('height', '100%')
    .attr('fill', fill)
}
