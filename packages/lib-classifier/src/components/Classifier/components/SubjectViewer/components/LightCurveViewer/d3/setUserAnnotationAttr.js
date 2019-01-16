import * as d3 from 'd3'
import preventDefaultAction from './preventDefaultAction'

export default function setUserAnnotationAttr (selection) {
  return selection
    .attr('class', 'user-annotation')
    .attr('fill', '#c44')
    .attr('fill-opacity', '0.5')
    .style('cursor', 'pointer')
    .on('click', function () {
      alert('+++ Example Annotation clicked')

      // Prevents clicks on the parent d3annotationsLayer, which add new annotations.
      preventDefaultAction()
    })
    .on('mousedown', preventDefaultAction) // Prevents "drag selection"
    .on('touchstart', preventDefaultAction)
}
