import { Factory } from 'rosie'

export default Factory.define('workflow')
  .sequence('id', (id) => { return id.toString() })
  .attr('display_name', ['id'], function (id) {
    return `Workflow #${id}`
  })
  .attr('active', true)
  .attr('configuration', {})
  .attr('first_task', '')
  .attr('grouped', false)
  .attr('links', {
    subject_sets: ['1', '2', '3', '4', '5']
  })
  .attr('tasks', {})
  .attr('steps', [])
  .attr('version', '1.0')
