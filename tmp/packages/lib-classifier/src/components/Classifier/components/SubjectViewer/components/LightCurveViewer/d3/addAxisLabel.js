export default function addAxisLabel (selection, className, text, axisStyle) {
  return selection
    .append('text')
    .attr('class', className)
    .style('font-size', axisStyle.fontSize)
    .style('font-family', axisStyle.fontFamily)
    .style('fill', axisStyle.color)
    .text(text)
}
