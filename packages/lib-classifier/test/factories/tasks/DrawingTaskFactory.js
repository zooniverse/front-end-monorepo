import { Factory } from 'rosie'

// TODO make configurable on tool type

export default new Factory()
  .attr('help', '')
  .attr('instruction', 'Please draw something')
  .attr('tools', [])
  .attr('type', 'drawing')
