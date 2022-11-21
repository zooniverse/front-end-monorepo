function cancelEvent(event) {
  event.stopPropagation
}

export default function addRemoveAnnotationButton (selection, onClick = null) {
  const size = 20 // Width and height

  const lx = size * -0.2
  const rx = size * 0.2
  const uy = size * 0.3
  const dy = size * 0.7

  const g = selection.append('g')
    .attr('class', 'remove-button')
    .attr('transform', `translate(0, 0)`)
    .style('cursor', 'pointer')

  g.append('circle')
    .attr('fill', '#4cc')
    .attr('r', size / 2)
    .attr('cx', 0)
    .attr('cy', size / 2)
    .style('pointer-events', 'all')
    // Prevent parent's brush events from triggering
    .on('mousedown touchstart', cancelEvent)
    .on('click', onClick)

  g.append('path')
    .attr('stroke', '#eee')
    .attr('stroke-width', '3')
    .attr('d', `M ${lx} ${uy} L ${rx} ${dy} M ${rx} ${uy} L ${lx} ${dy} `)
    .style('pointer-events', 'none')

  return g
}
