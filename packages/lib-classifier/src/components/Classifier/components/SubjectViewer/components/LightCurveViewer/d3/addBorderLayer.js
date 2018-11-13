export default function addBorderLayer (selection) {
  return selection
    .append('rect')
      .attr('class', 'deco border-layer')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'none')
      .attr('stroke', '#333')
      .attr('stroke-width', '2')
}
