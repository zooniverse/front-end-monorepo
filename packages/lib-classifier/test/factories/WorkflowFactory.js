import { Factory } from 'rosie'

export default new Factory()
  .sequence('id', (id) => { return id.toString() })
  .attr('display_name', ['id'], function (id) {
    return `Workflow #${id}`
  })
  .attr('active', true)
  .attr('configuration', {})
  .attr('first_task', '')
  .attr('tasks', {})
  .attr('steps', [])
  .attr('version', '1.0')
