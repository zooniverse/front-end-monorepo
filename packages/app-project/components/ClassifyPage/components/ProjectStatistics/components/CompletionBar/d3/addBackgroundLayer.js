export default function addBackgroundLayer (selection, fill) {
  return selection
    .append('rect')
    .attr('height', '100%')
    .attr('width', '100%')
    .style('fill', fill)
}
