export default function addBackgroundLayer (selection) {
  return selection
    .append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', '#f8f8f8')
}
