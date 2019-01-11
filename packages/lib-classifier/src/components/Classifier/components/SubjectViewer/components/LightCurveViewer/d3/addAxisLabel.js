export default function addAxisLabel (selection, className, text, axisLabelStyle) {
  return selection
    .append('text')
    .attr('class', className)
    .style('font-size', axisLabelStyle.fontSize)
    .style('font-family', axisLabelStyle.fontFamily)
    .text(text)
}
