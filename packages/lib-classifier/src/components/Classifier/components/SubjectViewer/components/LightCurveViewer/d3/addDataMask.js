export default function addDataMask (selection, outerMargin, id = Math.random()) {
  return selection
    .append('clipPath')
    .attr('id', `data-mask-${id}`)
    .append('rect')
    .attr('class', 'data-mask')
    .attr('transform', `translate(${outerMargin}, ${outerMargin})`)
    .attr('width', 0)
    .attr('height', 0)
}
