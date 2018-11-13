export default function addDataLayer (selection) {
  return selection
    .append('g')
      .attr('class', 'data-layer')
      .attr('clip-path', 'url(#data-mask)')
}
