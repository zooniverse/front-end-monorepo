export default function addDataLayer (selection, id = 0) {
  return selection
    .append('g')
    .attr('class', 'data-layer')
    .attr('clip-path', `url(#data-mask-${id})`)
}
