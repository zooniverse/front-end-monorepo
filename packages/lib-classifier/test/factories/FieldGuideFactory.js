import { Factory } from 'rosie'

export default new Factory()
  .sequence('id', (id) => { return id.toString() })
  .attr('items', [])
  .attr('language', 'en')
