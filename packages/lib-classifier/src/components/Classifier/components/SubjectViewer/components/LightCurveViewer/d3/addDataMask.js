export default function addDataMask (selection, outerMargin) {
  return selection
    .append('clipPath')
    .attr('id', `data-mask-${Math.random()}`)
    .append('rect')
    .attr('class', 'data-mask')
    .attr('transform', `translate(${outerMargin}, ${outerMargin})`)
    .attr('width', 0)
    .attr('height', 0)
}
