import { Factory } from 'rosie'

export default new Factory()
  .sequence('id', (id) => { return id.toString() })
  .attr('display_name', ['id'], function (id) {
    return `Workflow #${id}`
  })
  .attr('annotations', [])
  .attr('completed', false)
  .attr('links', {})
  .attr('metadata', {})
