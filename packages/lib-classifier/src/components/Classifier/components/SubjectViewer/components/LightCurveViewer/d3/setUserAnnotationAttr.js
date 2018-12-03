export default function setUserAnnotationAttr (selection) {
  return selection
    .attr('class', 'user-annotation')
    .attr('fill', '#c44')
    .attr('fill-opacity', '0.5')
    .style('cursor', 'pointer')
    .on('click', function () {
      console.log('+++ Example Annotation clicked')
      
      // Prevents clicks on the parent d3annotationsLayer, which add new annotations.
      d3.event.stopPropagation()
      d3.event.preventDefault()
    })
    .on('mousedown', function () { d3.event.stopPropagation() ; d3.event.preventDefault() })  // Prevents "drag selection"
    .on('touchstart', function () { d3.event.stopPropagation() ; d3.event.preventDefault() })
}
