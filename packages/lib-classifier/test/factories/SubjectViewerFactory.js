import { Factory } from 'rosie'

export default new Factory()
  .sequence('id', (id) => { return id.toString() })
  .attr('annotate', false)
  .attr('dimensions', [])
  .attr('flipbookSpeed', 1)
  .attr('frame', 0)
  .attr('fullscreen', false)
  .attr('invert', false)
  .attr('move', false)
  .attr('rotationEnabled', false)
  .attr('rotation', 0)
  .attr('viewerWidth', 'default')
