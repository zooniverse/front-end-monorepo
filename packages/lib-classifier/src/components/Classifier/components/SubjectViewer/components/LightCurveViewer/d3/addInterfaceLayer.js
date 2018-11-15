export default function addInterfaceLayer (selection) {
  return selection
    .append('rect')
      .attr('class', 'interface-layer')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .style('cursor', 'move')
}
